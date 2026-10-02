pipeline {
    agent any

    environment {
        // Jenkins credential (Username with password) holding DockerHub user + access token
        DOCKERHUB = credentials("dockerhub-creds")
        IMAGE     = "${DOCKERHUB_USR}/jenkins-demo-app"
        TAG       = "${env.BUILD_NUMBER}"
    }

    triggers {
        // Fallback trigger: check the repo for new commits every minute.
        // With a GitHub webhook configured, a push triggers the build immediately.
        pollSCM("* * * * *")
    }

    options {
        timeout(time: 15, unit: "MINUTES")
        timestamps()
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Build") {
            steps {
                sh "node --version && npm --version"
                sh "npm install"
            }
        }

        stage("Test") {
            steps {
                sh "npm test"
            }
        }

        stage("Docker Build") {
            steps {
                sh 'docker build -t $IMAGE:$TAG -t $IMAGE:latest .'
            }
        }

        stage("Push to DockerHub") {
            steps {
                sh 'echo "$DOCKERHUB_PSW" | docker login -u "$DOCKERHUB_USR" --password-stdin'
                sh 'docker push $IMAGE:$TAG'
                sh 'docker push $IMAGE:latest'
            }
        }

        stage("Deploy") {
            steps {
                sh '''
                    docker rm -f jenkins-demo-app || true
                    docker run -d --name jenkins-demo-app -p 3000:3000 $IMAGE:$TAG
                    sleep 3
                    docker exec jenkins-demo-app wget -qO- http://localhost:3000/health
                '''
            }
        }
    }

    post {
        always {
            sh "docker logout || true"
        }
        success {
            echo "Deployed $IMAGE:$TAG"
        }
        failure {
            echo "Pipeline failed - check the stage logs above."
        }
    }
}
