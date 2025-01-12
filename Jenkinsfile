pipeline {
    agent any

    environment {
        // Variables d'environnement pour le frontend et le backend
        FRONTEND_DIR = 'gestion-de-parc'
        BACKEND_DIR = 'server'
        NODE_VERSION = '16' // Version de Node.js
    }

    stages {
        // Étape 1 : Vérification du code
        stage('Checkout') {
            steps {
                echo 'Clonage du dépôt Git...'
                git branch: 'main', url: 'https://github.com/votre_utilisateur/votre_repo.git'
            }
        }

        // Étape 2 : Installation des dépendances pour le frontend et le backend
        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances pour le frontend...'
                dir(FRONTEND_DIR) {
                    sh 'npm install'
                }

                echo 'Installation des dépendances pour le backend...'
                dir(BACKEND_DIR) {
                    sh 'npm install'
                }
            }
        }

        // Étape 3 : Construction du frontend (React)
        stage('Build Frontend') {
            steps {
                echo 'Construction du frontend...'
                dir(FRONTEND_DIR) {
                    sh 'npm run build'
                }
            }
        }

        // Étape 4 : Exécution des tests pour le frontend et le backend
        stage('Run Tests') {
            steps {
                echo 'Exécution des tests pour le frontend...'
                dir(FRONTEND_DIR) {
                    sh 'npm test'
                }

                echo 'Exécution des tests pour le backend...'
                dir(BACKEND_DIR) {
                    sh 'npm test'
                }
            }
        }

        // Étape 5 : Déploiement du backend (Node.js)
        stage('Deploy Backend') {
            steps {
                echo 'Déploiement du backend...'
                dir(BACKEND_DIR) {
                    sh 'npm start &' // Démarre le serveur en arrière-plan
                }
            }
        }

        // Étape 6 : Déploiement du frontend (React)
        stage('Deploy Frontend') {
            steps {
                echo 'Déploiement du frontend...'
                dir(FRONTEND_DIR) {
                    sh 'npm start &' // Démarre l'application React en arrière-plan
                }
            }
        }
    }

    // Post-actions (facultatif)
    post {
        success {
            echo 'Le pipeline a réussi !'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}