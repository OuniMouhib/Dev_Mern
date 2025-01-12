# Étape 1 : Utiliser l'image Node.js pour construire l'application
FROM node:20 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Utiliser l'image Nginx pour servir les fichiers statiques
FROM nginx:1.23

# Copier les fichiers générés par la commande build dans le dossier public de Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application via le navigateur
EXPOSE 80

# Démarrer Nginx dans le conteneur
CMD ["nginx", "-g", "daemon off;"]