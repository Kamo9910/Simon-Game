FROM jenkins/jenkins:lts

USER root

# Install dependencies
RUN apt-get update && apt-get install -y curl unzip \
    && rm -rf /var/lib/apt/lists/*

# Install AWS CLI v2 globally
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip aws

USER jenkins