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
                sh('docker login -u serenainzani -p $DOCKERHUB_PASSWORD')
                sh('docker push serenainzani/lbg-api:build-$BUILD_NUMBER')
            }
        }
        stage('Deploy image to GCR on GCP') {
            steps {
                sh('docker tag serenainzani/lbg-api:build-$BUILD_NUMBER gcr.io/lbg-210222/serena-lbg-api:latest')
                sh('docker images')
                sh('docker push gcr.io/lbg-210222/serena-lbg-api:latest')

            }
        }
        stage('Create Kubernetes Cluster from GCP') {
            steps {
                sh '''kubectl apply -f ./kubernetes/nginx.yaml
                kubectl apply -f ./kubernetes/api-deployment.yaml
                '''
            }
        }
        stage('Cleanup!') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
}
