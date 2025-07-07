# Utiliser l’image Node.js officielle
FROM node:18

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port
EXPOSE 3000

# Démarrer l’application
CMD ["node", "server.js"]
