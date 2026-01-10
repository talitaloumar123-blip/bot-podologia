import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// ===============================
// CONFIGURAÇÃO Z-API (ENV)
// ===============================
const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;

if (!INSTANCE_ID || !TOKEN) {
  console.error("❌ INSTANCE_ID ou TOKEN não definidos nas variáveis de ambiente");
}

// ===============================
// FUNÇÃO PARA ENVIAR MENSAGEM
// ===============================
async function enviarMensagem(phone, message) {
  const url = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`;

  try {
    const response = await axios.post(url, {
      phone,
      message
    });

    console.log("Resposta Z-API send-text:", response.data);
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response?.data || error.message
    );
  }
}

// ===============================
// WEBHOOK Z-API
// ===============================
app.post("/webhook", async (req, res) => {
  console.log("Z-API POST recebido:", JSON.stringify(req.body, null, 2));

  const data = req.body;

  // Ignorar mensagens enviadas pelo próprio bot
  if (data.fromMe) {
    return res.sendStatus(200);
  }

  // Ignorar grupos
  if (data.isGroup) {
    return res.sendStatus(200);
  }

  // Garantir que é texto
  if (!data.text || !data.text.message) {
    return res.sendStatus(200);
  }

  const phone = data.phone;
  const mensagem = data.text.message.trim().toLowerCase();

  let resposta = "";

  if (mensagem === "oi" || mensagem === "olá" || mensagem === "ola") {
    resposta =
      "Olá! 👋\n\n" +
      "Digite uma opção:\n" +
      "• Serviços\n" +
      "• Preços\n" +
      "• Horário\n" +
      "• Endereço\n" +
      "• Agendar";
  } 
  else if (mensagem === "serviços") {
    resposta =
      "🦶 *Serviços de Podologia*\n\n" +
      "• Corte técnico de unhas\n" +
      "• Tratamento de calos e calosidades\n" +
      "• Unha encravada\n" +
      "• Avaliação podológica";
  } 
  else if (mensagem === "preços" || mensagem === "precos") {
    resposta =
      "💰 *Preços*\n\n" +
      "Os valores variam conforme o serviço.\n" +
      "Digite *Agendar* para falar conosco.";
  } 
  else if (mensagem === "horário" || mensagem === "horario") {
    resposta =
      "⏰ *Horário de Atendimento*\n\n" +
      "Segunda a Sexta: 08h às 18h\n" +
      "Sábado: 08h às 12h";
  } 
  else if (mensagem === "endereço" || mensagem === "endereco") {
    resposta =
      "📍 *Endereço*\n\n" +
      "Rua Exemplo, 123\n" +
      "Centro – Sua Cidade";
  } 
  else if (mensagem === "agendar") {
    resposta =
      "📅 Para agendar, por favor informe:\n\n" +
      "• Nome completo\n" +
      "• Melhor dia e horário";
  } 
  else {
    resposta =
      "Não entendi sua mensagem 😕\n\n" +
      "Digite:\n" +
      "Oi, Serviços, Preços, Horário, Endereço ou Agendar.";
  }

  await enviarMensagem(phone, resposta);

  res.sendStatus(200);
});

// ===============================
// SERVIDOR
// ===============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Bot rodando na porta ${PORT}`);
});
