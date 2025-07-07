FROM node:20

# Define diretório de trabalho
WORKDIR /app

# Copia apenas package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta
EXPOSE 3333

# Comando para rodar em modo desenvolvimento
CMD [ "npm", "run", "dev" ]
