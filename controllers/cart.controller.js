"use strict";
const express = require("express");
const cartRouter = express.Router();

const db = require("../config");

cartRouter.get("/cart", (req, res) => {
  let sql = "SELECT * FROM carrinho ORDER BY nome";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(result);
    }
  });
});

cartRouter.post("/add-cart", (req, res) => {
  let product = req.body.nome;
  let amount = req.body.quantidade;
  let unit = req.body.tipo_unitario;
  let price = req.body.valor;
  let total = req.body.total;

  let sql = `INSERT INTO carrinho (nome, quantidade, tipo_unitario, valor, total) VALUES ('${product}', ${amount}, '${unit}', ${price}, ${total})`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(201).json({ message: "product inserted successfully" });
  });
});

cartRouter.put("/update-cart", (req, res) => {
  let id = req.body.id;
  let product = req.body.nome;
  let amount = req.body.quantidade;
  let unit = req.body.tipo_unitario;
  let price = req.body.valor;
  let total = req.body.total;

  let sql = `UPDATE carrinho SET nome = '${product}', quantidade = ${amount}, tipo_unitario = '${unit}', valor = ${price}, total = ${total} WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(200).json({ message: "product updated successfully" });
  });
});

cartRouter.delete("/delete-cart", (req, res) => {
  let id = req.body.id;

  let sql = `DELETE FROM carrinho WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(200).json({ message: "product deleted successfully" });
  });
});

cartRouter.get("/search-cart/:name", (req, res) => {
  let product = req.params.name;

  let sql = `SELECT * FROM carrinho WHERE nome LIKE '%${product}%'`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(200).json(result);
  });
});

module.exports = cartRouter;
