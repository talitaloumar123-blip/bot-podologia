import express from "express";
const app = express();

// Aceitar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function processMessage(rawMessage) {
  const message = (rawMessage || "").toLowerCase();
  let response = "Não entendi sua mensagem 😕";

  if (
    message.includes("oi") ||
    message.includes("olá") ||
    message.includes("ola") ||
    message.includes("bom dia") ||
    message.includes("boa tarde") ||
    message.includes("boa noite")
  ) {
    response = `👣 *Clínica de Podologia*\n\nOlá! Seja muito bem-vindo(a) 😊\nComo posso te ajudar hoje?\n\n1️⃣ Serviços\n2️⃣ Horário de atendimento\n3️⃣ Endereço\n4️⃣ Valores\n5️⃣ Agendar atendimento`;
  } else if (message.includes("servico") || message.includes("servicos")) {
    response =
      "Nossos serviços:\n- Avaliação podológica\n- Corte técnico de unhas\n- Tratamento de calos\n- Unha encravada\n- Podologia preventiva";
  } else if (message.includes("preco") || message.includes("preços")) {
    response = `💰 *Valores*\n\nOs valores variam conforme o procedimento.\n📲 Para orçamento, fale com nosso atendimento.\n\nDigite *menu* para voltar ao início.`;
  } else if (message.includes("horario") || message.includes("horário")) {
    response = "Horário de atendimento:\nSegunda a sexta: 9h às 15h\nSábado: 9h às 13h";
  } else if (message.includes("endereco") || message.includes("endereço")) {
    response = "Endereço:\nRua Arabaiana, 557 - Brasilia Teimosa\nRecife - PE";
  } else if (message.includes("agendar")) {
    response = "Perfeito 😊\nVou chamar um atendente para te ajudar com o agendamento.\nAguarde um instante, por favor.";
  }

  return response;
}

// POST principal (WhatsApp/Z-API)
app.post("/webhook", (req, res) => {
  const rawMessage = req.body?.text?.message || req.query?.message || "";
  console.log("Z-API POST recebido:", JSON.stringify(req.body, null, 2));
  const reply = processMessage(rawMessage);
  res.json({ replyMessage: reply });
});

// GET opcional para navegador
app.get("/webhook", (req, res) => {
  const rawMessage = req.query?.message || "";
  const reply = processMessage(rawMessage);
  res.send(reply);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Bot rodando na porta " + PORT));
