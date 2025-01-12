pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'gestion-de-parc'
        BACKEND_DIR = 'server'
        NODE_VERSION = '20'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonage du dépôt Git...'
                git branch: 'main', url: 'https://github.com/OuniMouhib/Dev_Mern.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances...'
                dir(FRONTEND_DIR) {
                    sh 'npm install'
                }
                dir(BACKEND_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Lint and Build Frontend') {
            steps {
                echo 'Lint et construction du frontend...'
                dir(FRONTEND_DIR) {
                    sh '''
                        npm run lint
                        npm run build
                    '''
                }
            }
        }

        stage('Build and Start Services') {
            steps {
                echo 'Construction et démarrage des services Docker...'
                sh '''
                    docker-compose build
                    docker-compose up -d
                '''
            }
        }

        stage('Verify Services') {
            steps {
                echo 'Vérification des services...'
                sh '''
                    curl -I http://localhost:5000 || (echo "Le backend n'a pas démarré." && exit 1)
                    curl -I http://localhost:3000 || (echo "Le frontend n'a pas démarré." && exit 1)
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline exécuté avec succès !'
        }
        failure {
            echo 'Le pipeline a échoué.'
            sh 'docker-compose logs'
        }
        always {
            sh 'docker-compose down'
        }
    }
}
