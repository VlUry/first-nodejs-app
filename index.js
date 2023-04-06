const http = require("http");
const chalk = require("chalk");

const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Request method:", req.method);

  res.end("Privet");
});

server.listen(port, () => {
  console.log(chalk.green(`Server is started on port ${port}...`));
});
