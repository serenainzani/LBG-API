pipeline {
    environment {
        DOCKERHUB_PASSWORD = credentials("dockerhub_password")
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
                sh("docker login -u serenainzani --password $DOCKERHUB_PASSWORD")
                sh("docker push serenainzani/lbg-api:latest")
            }
        }
    }
}
