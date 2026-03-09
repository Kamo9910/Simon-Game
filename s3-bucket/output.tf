output "static_website_endpoint" {
  value = aws_s3_bucket_website_configuration.static_website.website_endpoint
  description = "The endpoint URL of the S3 static website."
  
}

output "bucket_name" {
  value = aws_s3_bucket.static_website.bucket
  description = "The name of the S3 bucket."
}