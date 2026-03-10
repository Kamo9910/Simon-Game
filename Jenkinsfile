pipeline {
  agent any

  environment {
    AWS_REGION = "us-east-1"
    AWS_S3_BUCKET = "terraform-ci-cd-s3-v5"
  }

  stages {
          stage('Check AWS CLI'){
            steps{
                sh'''
                docker build -t jenkins-awscli .
                docker run -d -p 8080:8080 -p 50000:50000 jenkins-awscli
                export PATH=$PATH:/user/local/bin
                aws --version
                '''
            }
          }
          stage('Terraform Apply'){
                agent { 
                    docker { 
                        image 'hashicorp/terraform:1.5.7'
                        reuseNode true 
                    } 
                }
                steps{
                    withCredentials([usernamePassword(credentialsId: 'my-aws-credentials', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                        sh''' 
                            cd s3-bucket
                            terraform init
                            terraform apply -auto-approve
                            terraform output -raw s3-bucket_name > bucket.txt
                        '''

                    }
                }
            }
          stage('AWS') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args "--entrypoint=''"
                }
            }
            
            steps{
                withCredentials([usernamePassword(credentialsId: 'my-aws-credentials', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                sh'''
                    aws --version
                    AWS_S3_BUCKET=$(cat terraform/bucket.txt)
                    aws s3 sync . s3://$AWS_S3_BUCKET --delete
                '''
                }
            }
        }

  }
}