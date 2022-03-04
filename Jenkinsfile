pipeline {
    environment {
        dockerhub_password = credentials("dockerhub_password")
    }
    agent any
    stages {
        stage('Testing') {
            steps {
                sh "npm install"
                sh "npm test"
            }
        }
        stage('Build image') {
            steps {
                sh "echo building a docker image..."
                sh "docker build -t serenainzani/lbg-api:latest ."
                sh "echo built image!"
            }
        }
        stage('Deploy Image to DockerHub') {
            steps {
                sh "echo ${dockerhub_password} | docker login -u serenainzani --password-stdin"
                sh "docker push serenainzani/lbg-api:latest"
            }
        }
    }
}