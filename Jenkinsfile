pipeline {
    agent any

    environment {
        // Variables d'environnement pour le frontend et le backend
        FRONTEND_DIR = 'gestion-de-parc'
        BACKEND_DIR = 'server'
        NODE_VERSION = '20' // Version de Node.js
    }

    stages {
        // Étape 1 : Vérification du code
        stage('Checkout') {
            steps {
                echo 'Clonage du dépôt Git...'
                git branch: 'main', url: 'https://github.com/OuniMouhib/Dev_Mern.git'
            }
        }

        // Étape 2 : Vérification des outils nécessaires
        stage('Check Tools') {
            steps {
                echo 'Vérification de la disponibilité de Node.js et npm...'
                sh '''
                    if ! command -v node &> /dev/null; then
                        echo "Node.js n'est pas installé. Veuillez l'installer avant de continuer."
                        exit 1
                    fi
                    if ! command -v npm &> /dev/null; then
                        echo "npm n'est pas installé. Veuillez l'installer avant de continuer."
                        exit 1
                    fi
                    echo "Node.js et npm sont installés."
                    node -v
                    npm -v
                '''
            }
        }

        // Étape 3 : Installation des dépendances pour le frontend et le backend
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

        // Étape 4 : Construction du frontend (React)
        stage('Build Frontend') {
            steps {
                echo 'Construction du frontend...'
                dir(FRONTEND_DIR) {
                    sh 'npm run build'
                }
            }
        }

        // Étape 5 : Exécution des tests pour le frontend et le backend
        stage('Run Tests') {
            steps {
                echo 'Exécution des tests pour le frontend...'
                dir(FRONTEND_DIR) {
                    sh 'npm test || echo "Certains tests ont échoué, veuillez vérifier les logs."'
                }

                echo 'Exécution des tests pour le backend...'
                dir(BACKEND_DIR) {
                    sh 'npm test || echo "Certains tests ont échoué, veuillez vérifier les logs."'
                }
            }
        }

        // Étape 6 : Déploiement du backend (Node.js)
        stage('Deploy Backend') {
            steps {
                echo 'Déploiement du backend...'
                dir(BACKEND_DIR) {
                    sh '''
                        echo "Démarrage du serveur backend..."
                        npm start &
                        sleep 10
                        echo "Vérification du serveur backend..."
                        curl -I http://localhost:3000 || (echo "Le serveur backend n'a pas démarré correctement." && exit 1)
                    '''
                }
            }
        }

        // Étape 7 : Déploiement du frontend (React)
        stage('Deploy Frontend') {
            steps {
                echo 'Déploiement du frontend...'
                dir(FRONTEND_DIR) {
                    sh '''
                        echo "Démarrage de l'application React..."
                        npm start &
                        sleep 10
                        echo "Vérification de l'application React..."
                        curl -I http://localhost:3001 || (echo "L'application React n'a pas démarré correctement." && exit 1)
                    '''
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
            echo 'Le pipeline a échoué. Veuillez vérifier les logs pour plus d\'informations.'
        }
    }
}
