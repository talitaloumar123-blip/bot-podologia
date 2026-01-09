const express = require("express");
const app = express();

app.use(express.json());
app.get("/webhook", (req, res) => {
  const message =
  (
    req.body?.message ||
    req.body?.text?.message ||
    req.body?.message?.text ||
    ""
  ).toLowerCase();
console.log("Webhook recebido:", JSON.stringify(req.body, null, 2));


  let response = "Não entendi sua mensagem 😕";

  if (
    message.includes("oi") ||
    message.includes("olá") ||
    message.includes("ola") ||
    message.includes("bom dia") ||
    message.includes("boa tarde")
  ) {
    response = `👣 *Clínica de Podologia*

Olá! Seja muito bem-vindo(a) 😊  
Como posso te ajudar hoje?

1️⃣ Serviços  
2️⃣ Horário de atendimento  
3️⃣ Endereço  
4️⃣ Valores  
5️⃣ Agendar atendimento`;
  }

  res.send(response);
});

app.post("/webhook", (req, res) => {
  const message = (req.body.message || "").toLowerCase();
  let response = "";

  if (
    message.includes("oi") ||
    message.includes("ola") ||
    message.includes("olá") ||
    message.includes("bom dia") ||
    message.includes("boa tarde") ||
    message.includes("boa noite")
  ) {
    response =
      "Ola! Seja bem-vindo(a) a Clinica de Podologia S.O.S do Pé.\n\n" +
      "Como posso ajudar?\n" +
      "Digite:\n" +
      "1 - Servicos\n" +
      "2 - Precos\n" +
      "3 - Horario\n" +
      "4 - Endereco\n" +
      "5 - Agendar";
  }

  else if (message.includes("servico") || message.includes("servicos")) {
    response =
      "Nossos servicos:\n" +
      "- Avaliacao podologica\n" +
      "- Corte tecnico de unhas\n" +
      "- Tratamento de calos\n" +
      "- Unha encravada\n" +
      "- Podologia preventiva";
  }

  else if (message.includes("preco") || message.includes("preços")) {
  response = `💰 *Valores*

Os valores variam conforme o procedimento.

📲 Para orçamento, fale com nosso atendimento.

Digite *menu* para voltar ao início.`;
}


  else if (message.includes("horario") || message.includes("horário")) {
    response =
      "Horario de atendimento:\n" +
      "Segunda a sexta: 9h as 15h\n" +
      "Sabado: 9h as 13h";
  }

  else if (message.includes("endereco") || message.includes("endereço")) {
    response =
      "Endereco:\n" +
      "Rua Arabaiana, 557 - Brasilia teimosa\n" +
      "Recife - PE";
  }

 else if (message.includes("agendar")) {
  response =
    "Perfeito 😊\n" +
    "Vou chamar um atendente para te ajudar com o agendamento.\n" +
    "Aguarde um instante, por favor.";
}


  else {
    response =
      "Nao entendi sua mensagem.\n" +
      "Digite: Servicos, Precos, Horario, Endereco ou Agendar.";
  }

  return res.json({
    replyMessage: response
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bot rodando na porta " + PORT);
});

