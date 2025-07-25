import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const { MONGO_URI, PORT = 4000 } = process.env;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB conectado!!"))
    .catch(err => console.error("Erro ao conectar no MongoDB:", err));

app.get('/', (req, res) => {
    res.send('API Online 🚀');
});

// Mapeia os estados da conexao
const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
};

app.get('/health', (req, res) => {
    const state = dbStates[mongoose.connection.readyState] || "unknown";
    res.json({ status: "ok", dbState: state });
});

app.listen(PORT, () => {
    console.log(` 🚀 Servidor rodando na porta ${PORT}`);
});