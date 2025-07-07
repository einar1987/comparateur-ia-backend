# Utilise l’image officielle de Node.js
FROM node:18

# Crée le dossier de travail
WORKDIR /app

# Copie les fichiers package.json
COPY package.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

# Démarre le serveur
CMD ["npm", "start"]
