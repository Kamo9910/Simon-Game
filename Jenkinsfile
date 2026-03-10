pipeline {
  agent any

  environment {
    AWS_REGION = "us-east-1"
    AWS_S3_BUCKET = "terraform-ci-cd-s3-v5"
  }

  stages {
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
                    aws s3 sync . s3://$AWS_S3_BUCKET --delete
                '''
                }
            }
        }

  }
}