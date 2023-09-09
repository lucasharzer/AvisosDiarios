FROM node:16

WORKDIR /src

COPY package*.json ./

# Instalar pacotes necessários para o funcionamento do venom-bot no Docker
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libasound2 \
    libatk1.0-0 \
    libgtk-3-0 \
    libdrm2 \
    libgbm1

RUN npm install

RUN npm cache clean --force

# Ajustar a time zone do contêiner Docker
ENV TZ=America/Sao_Paulo

ENV URL=${URL}
ENV ACCOUNTSID=${ACCOUNTSID}
ENV AUTHTOKEN=${AUTHTOKEN}
ENV SENDERPHONE=${SENDERPHONE}
ENV RECIPIENTPHONE=${RECIPIENTPHONE}
ENV EMAILPROVIDER=${EMAILPROVIDER}
ENV SENDEREMAIL=${SENDEREMAIL}
ENV EMAILPASS=${EMAILPASS}
ENV RECIPIENTEMAIL=${RECIPIENTEMAIL}
ENV RUNHOUR=${RUNHOUR}
ENV RUNMINUTE=${RUNMINUTE}

COPY . .

CMD ["npm", "start"]