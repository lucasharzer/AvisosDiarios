require("dotenv").config();
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const venom = require("venom-bot");


class MessageHandler {
    constructor(mensagem) {
        // Variáveis de configuração para os serviços
        this.accountSid = process.env.ACCOUNTSID;
        this.authToken = process.env.AUTHTOKEN;
        this.senderPhone = process.env.SENDERPHONE;
        this.recipientPhone = process.env.RECIPIENTPHONE;

        this.emailProvider = process.env.EMAILPROVIDER;
        this.senderEmail = process.env.SENDEREMAIL;
        this.emailPass = process.env.EMAILPASS;
        this.recipientEmail = process.env.RECIPIENTEMAIL;

        this.mensagem = mensagem;
    }

    async enviarSMS() {
        // Enviar mensagem via SMS
        const client = twilio(this.accountSid, this.authToken);
        try {
            await client.messages.create({
                to: this.recipientPhone,
                from: this.senderPhone,
                body: this.mensagem
            });
            console.log("\nSMS enviado");
        } catch(error) {
            console.error(error);
        }
    }

    async enviarEmail() {
        // Fazer login no e-mail
        const transporter = nodemailer.createTransport({
            service: this.emailProvider,
            auth: {
                user: this.senderEmail,
                pass: this.emailPass
            }
        });
        // Definir opções de e-mail 
        const mailOptions = {
            from: this.senderEmail,
            to: this.recipientEmail,
            subject: "Cotação Diária",
            text: this.mensagem
        };
        // Enviar mensagem via e-mail
        try {
            await transporter.sendMail(mailOptions);
            console.log("e-mail enviado");
        } catch(error) {
            console.error(error);
        }
    }

    async enviarWhatsapp(infosZap) {
        try {
            if (infosZap.sessionZap == false) {
                // Conectar ao Whatsapp
                infosZap.client = await venom.create({ 
                    session: "avisos-js",
                    disableWelcome: true
                });
                infosZap.sessionZap = true;
            }
            // Enviar mensagem via Whatsapp
            // Para um número: @c.us / Para um grupo: @g.us
            await infosZap.client.sendText(`${this.recipientPhone.replace("+", "")}@c.us`, this.mensagem);
            console.log("Whatsapp enviado");
        } catch(error) {
            console.error(error);
        }
    }
}


module.exports = MessageHandler;    