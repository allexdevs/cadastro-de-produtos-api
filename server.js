const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));

const productRouter = require("./controllers/produtct.controller");
const cartRouter = require("./controllers/cart.controller");

app.use(productRouter);
app.use(cartRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
