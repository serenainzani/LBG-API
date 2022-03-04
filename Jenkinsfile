pipeline {
    environment {
        // registry = "serenainzani/lbg-api"
        // registryCredential = 'dockerhub'
        dockerhub_password = credentials("dockerhub_password")
        // dockerImage = ''
    }
    agent any
    stages {
        stage('Hello') {
            steps {
                sh "echo Testing Jenkins was triggered by a pull request..."
            }
        }
        stage('Test') {
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
                sh "docker login -u serenainzani -p ${dockerhub_password}"
                sh "docker push serenainzani/lbg-api:latest"
            }
        }
        stage('Done') {
            steps {
                sh "echo Finished!!!!"
            }
        }
    }
}