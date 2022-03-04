pipeline {
    environment {
        registry = "serenainzani/lbg-api"
        registryCredential = 'dockerhub'
        DOCKER_ID = credentials("dockerhub_password")
        DOCKER_PASSWORD = credentials("DOCKER_ID")
        dockerImage = ''
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
                script {
                    dockerImage = docker.build "serenainzani/lbg-api:latest"
                }
                sh "echo built image!"
            }
        }
        stage('Deploy Image to DockerHub') {
            steps {
                script {
                    docker login -u serenainzani -p ${DOCKER_PASSWORD}
                    docker push ${dockerImage}
                    }
                }
            }
        }
        stage('Done') {
            steps {
                sh "echo Finished!!!!"
            }
        }
    }
}