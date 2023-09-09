require("dotenv").config();
const axios = require("axios");
const MessageHandler = require("./services/message");
const schedule = require("node-schedule");
const { format } = require("date-fns");


const infosZap = { sessionZap: false, client: 0 };


async function EnviarValores(infosZap) {
    const data = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    console.log("\nObtendo valores...");

    // Definir e obter: Dólar - Real | Euro - Real | Libra esterlina - Real | Bitcoin - Real
    const moedas = [
        { nome: "Dólar", simbolo: "USD" },
        { nome: "Euro", simbolo: "EUR" },
        { nome: "Libra esterlina", simbolo: "GBP" },
        { nome: "Bitcoin", simbolo: "BTC" }
    ];

    // Montar mensagem...
    let mensagem = "As cotações atuais estão assim:\n\n";

    for (const moeda of moedas) {
        console.log(`• ${moeda.nome}`);

        // Requisição
        while (true) {
            try {
                const resposta = await axios.get(
                    `${process.env.URL}/${moeda.simbolo}-BRL`
                );
                moeda.valor = `R$ ${parseFloat(resposta.data[0].high)
                    .toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                break;
            } catch(error) {
                console.error(error);
            }
        }  

        // ...
        mensagem += `• ${moeda.nome} (${moeda.simbolo}): ${moeda.valor}\n`;
    }

    // Mensagem montada
    mensagem += "\nFique por dentro das últimas atualizações do mercado!";

    // Enviar mensagem
    const services = new MessageHandler(mensagem);
    await services.enviarSMS();
    await services.enviarEmail();
    await services.enviarWhatsapp(infosZap);
    console.log(`\nProcesso Finalizado\n${data}`);
}

function AgendarTarefa() {
    // Executar tarefa em um horário específico    
    schedule.scheduleJob(`${process.env.RUNMINUTE} ${process.env.RUNHOUR} * * *`, async() => {
        await EnviarValores(infosZap);
    });
}


AgendarTarefa();