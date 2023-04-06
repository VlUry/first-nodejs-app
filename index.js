const http = require("http");
const express = require("express");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");

const { addNote } = require("./notes.controller");

const port = 3000;

const basePath = path.join(__dirname, "./pages");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.join(basePath, "index.html")));

app.post("/", async (req, res) => {
  await addNote(req.body);
  res.sendFile(path.join(basePath, "index.html"));
});

app.listen(port, () => {
  console.log(chalk.green(`Server is started on port ${port}...`));
});
