import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;
const CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN;

const ZAPI_BASE_URL = "https://api.z-api.io";

app.post("/webhook", async (req, res) => {
  console.log("Z-API POST recebido:", JSON.stringify(req.body, null, 2));

  if (req.body?.fromMe) {
    return res.sendStatus(200);
  }

  const message = req.body?.text?.message
    ? req.body.text.message.toLowerCase()
    : "";

  const phone = req.body?.phone;

  let response =
    "Não entendi sua mensagem 😕\n" +
    "Digite: Oi, Serviços, Preços, Horário, Endereço ou Agendar.";

  if (
    message.includes("oi") ||
    message.includes("olá") ||
    message.includes("ola") ||
    message.includes("bom dia") ||
    message.includes("boa tarde") ||
    message.includes("boa noite")
  ) {
    response =
      "👣 Clínica de Podologia\n\n" +
      "Olá! Seja bem-vindo(a) 😊\n\n" +
      "1️⃣ Serviços\n" +
      "2️⃣ Preços\n" +
      "3️⃣ Horário\n" +
      "4️⃣ Endereço\n" +
      "5️⃣ Agendar";
  } else if (message.includes("serviço") || message.includes("servicos")) {
    response =
      "🦶 Serviços:\n" +
      "- Avaliação podológica\n" +
      "- Corte técnico de unhas\n" +
      "- Tratamento de calos\n" +
      "- Unha encravada\n" +
      "- Podologia preventiva";
  } else if (message.includes("preço") || message.includes("precos")) {
    response =
      "💰 Valores:\n" +
      "Os valores variam conforme o procedimento.\n" +
      "Fale conosco para orçamento.";
  } else if (message.includes("horário") || message.includes("horario")) {
    response =
      "⏰ Horário:\n" +
      "Segunda a sexta: 9h às 15h\n" +
      "Sábado: 9h às 13h";
  } else if (message.includes("endereço") || message.includes("endereco")) {
    response =
      "📍 Endereço:\n" +
      "Rua Arabaiana, 557\n" +
      "Brasília Teimosa – Recife/PE";
  } else if (message.includes("agendar")) {
    response =
      "📅 Perfeito!\n" +
      "Um atendente irá falar com você para agendar 😊";
  }

  try {
    const url =
      ZAPI_BASE_URL +
      "/instances/" +
      INSTANCE_ID +
      "/token/" +
      TOKEN +
      "/send-text";

    const zapiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "client-token": CLIENT_TOKEN
      },
      body: JSON.stringify({
        phone: phone,
        message: response
      })
    });

    const data = await zapiResponse.json();
    console.log("Resposta Z-API:", data);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Bot rodando na porta " + PORT);
});
