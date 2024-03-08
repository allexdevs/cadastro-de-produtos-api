"use strict";
const express = require("express");
const productRouter = express.Router();
const db = require("../config");

productRouter.get("/products", (req, res) => {
  let sql = "SELECT * FROM produtos ORDER BY nome";

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(200).json(result);
  });
});

productRouter.get("/search-product/:name", (req, res) => {
  let name = req.params.name;
  let sql = `SELECT * FROM produtos WHERE nome LIKE '%${name}%'`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(200).json(result);
  });
});

productRouter.post("/add-product", (req, res) => {
  let name = req.body.nome;
  let amount = req.body.quantidade;
  let description = req.body.descricao;
  let price = req.body.valor;
  let unit = req.body.tipo_unitario;

  let sql = `INSERT INTO produtos (nome, descricao, quantidade, valor, tipo_unitario) VALUES ('${name}', '${description}', ${amount}, ${price}, '${unit}')`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(201).json({ message: "product inserted successfully" });
  });
});

productRouter.put("/update-product", (req, res) => {
  let id = req.body.id;
  let name = req.body.nome;
  let amount = req.body.quantidade;
  let description = req.body.descricao;
  let price = req.body.valor;
  let unit = req.body.tipo_unitario;

  let sql = `UPDATE produtos SET nome = '${name}', descricao = '${description}', quantidade = ${amount}, valor = ${price}, tipo_unitario = '${unit}' WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(200).json({ message: "product updated successfully" });
  });
});

productRouter.delete("/delete-product", (req, res) => {
  let id = req.body.id;
  let sql = `DELETE FROM produtos WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) res.status(500).json({ error: err });
    else res.status(200).json({ message: "product deleted successfully" });
  });
});

module.exports = productRouter;
