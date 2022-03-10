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
                sh 'echo building a docker image...'
                sh 'docker build -t serenainzani/lbg-api:build-$BUILD_NUMBER .'
                sh 'echo built image!'
            }
        }
        stage('Deploy Image to DockerHub') {
            steps {
                sh('logging into serena\'s docker hub...')
                sh('docker login -u serenainzani -p $DOCKERHUB_PASSWORD')
                sh('Logged in!')
                sh('Pushing image to docker hub...')
                sh('docker push serenainzani/lbg-api:build-$BUILD_NUMBER')
            }
        }

        stage('Create Kubernetes Cluster') {
            steps {
                sh '''kubectl apply -f ./kubernetes/nginx.yaml
                kubectl apply -f ./kubernetes/api-deployment.yaml
                '''
            }
        }
        stage('Cleanup!') {
            steps {
                sh 'docker system prune'
            }
        }
    }
}
