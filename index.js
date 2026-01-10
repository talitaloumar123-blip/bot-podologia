import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const INSTANCE_ID = "SUA_INSTANCE_ID";
const TOKEN = "SEU_TOKEN";

// ================== FUNÇÃO ÚNICA DE RESPOSTA ==================
function gerarResposta(texto) {
  const msg = (texto || "").toLowerCase().trim();

  if (
    msg.includes("oi") ||
    msg.includes("olá") ||
    msg.includes("ola") ||
    msg.includes("menu") ||
    msg.includes("bom dia") ||
    msg.includes("boa tarde") ||
    msg.includes("boa noite")
  ) {
    return `👣 *Clínica de Podologia*

Olá! Seja bem-vindo(a) 😊  
Como posso te ajudar?

1️⃣ Serviços  
2️⃣ Horário  
3️⃣ Endereço  
4️⃣ Valores  
5️⃣ Agendar`;
  }

  if (msg === "1" || msg.includes("serviço")) {
    return `🦶 *Serviços*
- Avaliação podológica
- Corte técnico de unhas
- Tratamento de calos
- Unha encravada`;
  }

  if (msg === "2" || msg.includes("horário")) {
    return `🕘 *Horário de atendimento*
Seg–Sex: 9h às 15h  
Sáb: 9h às 13h`;
  }

  if (msg === "3" || msg.includes("endereço")) {
    return `📍 *Endereço*
Rua Arabaiana, 557  
Brasília Teimosa – Recife`;
  }

  if (msg === "4" || msg.includes("valor") || msg.includes("preço")) {
    return `💰 *Valores*
Os valores variam conforme o procedimento.
Digite *menu* para voltar.`;
  }

  if (msg === "5" || msg.includes("agendar")) {
    return `Perfeito 😊  
Um atendente humano irá falar com você.`;
  }

  return `Não entendi sua mensagem 😕  
Digite: *Oi*, *Serviços*, *Horário*, *Endereço*, *Valores* ou *Agendar*.`;
}

// ================== ENVIO REAL PELO WHATSAPP ==================
async function enviarMensagemWhats(phone, message) {
  const url = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, message }),
  });
}

// ================== WEBHOOK Z-API ==================
app.post("/webhook", async (req, res) => {
  console.log("Z-API POST recebido:", JSON.stringify(req.body, null, 2));

  // ignora mensagens do próprio bot
  if (req.body.fromMe) {
    return res.sendStatus(200);
  }

  const phone = req.body.phone;
  const text = req.body?.text?.message;

  if (!phone || !text) {
    return res.sendStatus(200);
  }

  const resposta = gerarResposta(text);
  await enviarMensagemWhats(phone, resposta);

  res.sendStatus(200);
});

// ================== TESTE PELO NAVEGADOR ==================
app.get("/webhook", (req, res) => {
  const resposta = gerarResposta(req.query.message);
  res.send(resposta);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("🤖 Bot rodando na porta " + PORT);
});
