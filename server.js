const Socketserver = require("./app");

const server = Socketserver.listen(3001, () => {
  console.log("Server Started...");
});
