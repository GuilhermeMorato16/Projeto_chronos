const express = require("express");
const cors = require("cors");
const app = express();
const port = 9000;

const departamentoRoutes = require('./src/routes/departamentoRoutes');
const funcionariosRoutes = require('./src/routes/funcionariosRoutes');

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API do Chronos");
});

app.use("/departamentos", departamentoRoutes);
app.use("/funcionarios", funcionariosRoutes);



app.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}`);
});