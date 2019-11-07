const app = require("./app");
const config = require("./config");

app.listen(config.server.port, (err, resp) => {
  if (err) reject({ msg: "Connection error" });
  console.log(
    `Servidor (${config.server.name}) works on port http://localhost:${config.server.port}`
  );
});
