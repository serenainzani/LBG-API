pipeline {
    agent any
    stages {
        stage('Testing') {
            steps {
                sh "npm install"
                sh "npm test"
            }
        }
        stage('Build image for Dockerhub') {
            steps {
                sh 'echo building a docker image...'
                sh 'docker build -t serenainzani/lbg-api:build-$BUILD_NUMBER -t serenainzani/lbg-api:latest .'
                sh 'echo built image!'
            }
        }
        stage('Deploy Image to DockerHub') {
            steps {
                sh('docker push serenainzani/lbg-api:build-$BUILD_NUMBER')
                sh('docker push serenainzani/lbg-api:latest')
            }
        }
        stage('Deploy retagged image to GCR (GCP)') {
            steps {
                sh('docker tag serenainzani/lbg-api:build-$BUILD_NUMBER gcr.io/lbg-210222/serena-lbg-api:build-$BUILD_NUMBER')
                sh('docker tag serenainzani/lbg-api:latest gcr.io/lbg-210222/serena-lbg-api:latest')
                sh('docker push gcr.io/lbg-210222/serena-lbg-api:build-$BUILD_NUMBER')
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
                sh 'docker rmi gcr.io/lbg-210222/serena-lbg-api:build-$BUILD_NUMBER'
                sh 'docker rmi gcr.io/lbg-210222/serena-lbg-api:latest'
                sh 'docker rmi serenainzani/lbg-api:build-$BUILD_NUMBER'
                sh 'docker rmi serenainzani/lbg-api:latest'
            }
        }
    }
}
