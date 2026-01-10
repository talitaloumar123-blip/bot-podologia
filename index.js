import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;

const ZAPI_BASE_URL = "https://api.z-api.io";

console.log("Z-API CONFIG OK?", {
  instance: INSTANCE_ID,
  tokenConfigured: !!TOKEN,
});

app.post("/webhook", async (req, res) => {
  console.log("Z-API POST recebido:", JSON.stringify(req.body, null, 2));

  if (req.body.fromMe) {
    return res.sendStatus(200);
  }

  const message = req.body?.text?.message
    ? req.body.text.message.toLowerCase()
    : "";

  const phone = req.body.phone;

  let response =
    "Não entendi sua mensagem 😕\nDigite: Oi, Serviços, Preços, Horário, Endereço ou Agendar.";

  if (
    message.includes("oi") ||
    message.includes("olá") ||
    message.includes("ola") ||
    message.includes("bom dia") ||
