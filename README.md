# Disparador de Aviso Diário
Busca informações atuais sobre a cotação do Dólar, Euro, Libra Esterlina e Bitcoin na API: https://economia.awesomeapi.com.br/. Envia uma mensagem via SMS, E-mail e Whatsapp uma vez por dia em um horário específico. Para execução local e no Docker.

# Informações necessárias para o envio
- SMS: Envio feito por meio da plataforma Twilio: https://www.twilio.com/en-us e é necessário ter o Account SID, Auth Token, e o número de telefone disponibilizados pela plataforma;
- E-mail: Envio feito por meio do pacote nodemailer do Node JS e é necessário ter o provedor de e-mail (tipo), e-mail do remetente e senha;
- Whatsapp: Envio feito por meio do pacote venom-bot do Node JS e é necessário ter um celular com o app para escanear o QRCode a fim de realizar o envio;

Obs: Em todos os casos precisa do número de telefone do destinatário.

# Bibliotecas do programa
- axios: Pacote para fazer requisições na API e obter os valores;
- date-fns: Pacote para definição e formatação de datas;
- dotenv: Pacote para acessar as variáveis de ambiente do arquivo .env;
- node-schedule: Pacote para agendamento de funções e tarefas em períodos e horários específicos;
- nodemailer: Pacote para fazer login e enviar mensagens por E-mail;
- twilio: Pacote para envio de mensagens via SMS;
- venom-bot: Pacote para acessar e enviar mensagens no Whatsapp;

# Comandos
- Execução local
Verificar versão no gerenciador de pacotes do Node JS (npm)
```bash
npm --version
```
Instalar todas as bibliotecas
```bash
npm install
```
Iniciar o programa
```bash
npm start
```
- Execução no Docker
Verificar versão do Docker
```bash
docker --version
```
Criar a imagem Docker
```bash
docker build -t <image>
```
Rodar a imagem e criar o conteinêr Docker
```bash
docker run -it --name=<container> <image>
```
Iniciar ou parar o conteinêr criado
```bash
docker start <container ID>
```
```bash
docker stop <container ID>
```

