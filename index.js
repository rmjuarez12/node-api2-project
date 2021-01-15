//* Import Server
const server = require("./api/server");

//* Declare the port
const PORT = 4000;

//* Start listening to the server at the port above
server.listen(PORT, () => {
  console.log(`\n--- Server Running on http://localhost:${PORT} ---\n`);
});
