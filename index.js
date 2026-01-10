import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;
const ZAPI_BASE_URL = "https://api.z-api.io";

// 🔍 sanity check
console.log("Z-API CONFIG:", {
  INSTANCE_ID,
  TOKEN_EXISTS: !!TOKEN,
});

app.post("/webhook", async (req, res) => {
  console.log("Z-API POST recebido:", JSON.stringify(req.body, null, 2));

  // ignora mensagens enviadas pelo próprio bot
  if (req.body.fromMe) {
    return res.sendStatus(200);
  }

  const message =
    req.body?.text?.message?.toLowerCase() || "";

  const phone = req.body.phone;

  let response = "Não entendi sua mensagem 😕\nDigite: Oi, Serviços, Preços, Horário, Endereço ou Agendar.";

  if (
    message.includes("oi") ||
    message.includes("olá") ||
    message.includes("ola") ||
    message.includes("bom dia") ||
    message.includes("boa tarde") ||
    message.includes("boa noite")
  ) {
    response = `👣 *Clínica de Podologia*

Olá! Seja bem-vindo(a) 😊  
Como posso te ajudar?

1️⃣ Serviços  
2️⃣ Preços  
3️⃣ Horário  
4️⃣ Endereço  
5️⃣ Agendar`;
  } 
  else if (message.includes("serviço") || message.includes("servicos")) {
    response = `🦶 *Serviços*
- Avaliação podológica
- Corte técnico de unhas
- Tratamento de calos
- Unha encravada
- P
