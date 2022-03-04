pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                sh "Testing Jenkins was triggered by a pull request..."
            }
        }
        stage('Build image') {
            steps {
                sh "echo building a docker image..."
                sh "docker build -t serenainzani/lbg-api:latest ."
                sh "built image!"
            }
        }
        stage('Done') {
            steps {
                sh "echo Finished!"
            }

        }
    }
}