pipeline {
    environment {
        dockerImage = ''
    }
    agent any
    stages {
        stage('Hello') {
            steps {
                sh "echo Testing Jenkins was triggered by a pull request..."
            }
        }
        stage('Build image') {
            steps {
                sh "echo building a docker image..."
                script{
                    dockerImage = docker.build "serenainzani/lbg-api:latest"
                }
                sh "echo built image!"
            }
        }
        stage('Deploy Image to DockerHub') {
            steps {
                sh "docker.withRegistry( '', 'serenainzani') { dockerImage.push() }"
            }
        }
    
        stage('Done') {
            steps {
                sh "echo Finished!!"
            }
        }
    }
}