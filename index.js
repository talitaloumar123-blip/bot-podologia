import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURAÇÃO Z-API
const INSTANCE_ID = "3ECEE11AD5BFC2CA35EAC6C617EB3F06";
const TOKEN = "D68AF2CC460343506A5CFA77";

// Função que processa a mensagem e retorna resposta
function processMessage(rawMessage) {
  const message = (rawMessage || "").toLowerCase().trim();
  let response = "Não entendi sua mensagem 😕\nDigite: Oi, Serviços, Preços, Horário, Endereço ou Agendar.";

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
