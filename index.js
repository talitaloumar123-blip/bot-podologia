import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// ⚠️ TROQUE PELOS DADOS DA SUA Z-API
const INSTANCE_ID = "3ECEE11AD5BFC2CA35EAC6C617EB3F06";
const TOKEN = "D68AF2CC460343506A5CFA77";

// ROTA QUE A Z-API VAI CHAMAR
app.post("/webhook", async (req, res) => {
  try {
    const msg = req.body.message?.text?.toLowerCase();
    const phone = req.body.message?.phone;

    // Se não vier mensagem válida, não faz nada
    if (!msg || !phone) {
      return res.sendStatus(200);
    }

    let resposta = "";

    if (msg === "1") {
      resposta = `📅 *Agendamento de consulta*

Por favor, envie:
• Nome completo
• Tipo de atendimento
• Dia e horário preferido`;
    } 
    else if (msg === "2") {
      resposta = `💰 *Valores dos atendimentos*

• Avaliação: R$ XX
• Podologia preventiva: R$ XX
• Unha encravada: R$ XX`;
    } 
    else if (msg === "3") {
      resposta = `🦶 *Tratamentos*

✔️ Unha encravada
✔️ Calos e calosidades
✔️ Rachaduras
✔️ Pé diabético`;
    } 
    else if (msg === "4") {
      resposta = `👩‍⚕️ Um atendente falará com você em breve.`;
    } 
    else {
      resposta = `Olá! 👋  
Você está falando com a *Clínica de Podologia* 🦶

Digite uma opção:
1️⃣ Agendar consulta
2️⃣ Valores
3️⃣ Tratamentos
4️⃣ Falar com atendente`;
    }

    // ENVIA A RESPOSTA PELO Z-API
    await axios.post(
      `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
      {
        phone: phone,
        message: resposta
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Erro no webhook:", error.message);
    res.sendStatus(200);
  }
});

// PORTA (Railway usa automaticamente)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 Bot rodando na porta ${PORT}`);
});
