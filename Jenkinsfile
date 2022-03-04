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
        //TODO - Adding tests
        stage('Test') {
            steps {
                sh "npm install"
                sh "npm test"
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
        // stage('Deploy Image to DockerHub') {
        //     steps {
        //         sh "docker.withRegistry( 'https://hub.docker.com/repository/docker/serenainzani/lbg-api', 'serenainzani') { dockerImage.push() }"
        //     }
        // }
    
        stage('Done') {
            steps {
                sh "echo Finished!!!!!"
            }
        }
    }
}