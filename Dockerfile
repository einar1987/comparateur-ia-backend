# Utilise une image Node officielle
FROM node:18

# Dossier de travail
WORKDIR /app

# Copie les fichiers
COPY package.json .

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

# Port exposé
EXPOSE 3000

# Démarre le serveur
CMD ["npm", "start"]
