//* Import Server
const server = require("./api/server");

//* Declare the port
const PORT = 4000;

server.listen(PORT, () => {
  console.log(`\n--- Listening to server on port ${PORT}! ---\n`);
});
