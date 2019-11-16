const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8021;
const app = express();

app.use(cors());
app.use(express.json());

//Static
app.use(express.static(__dirname + "/dist/"));

//Output
app.listen(port, () => {
  console.info("Server Vue iniciado en " + port);
});
