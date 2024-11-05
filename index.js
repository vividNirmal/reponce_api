const express = require('express');
const cors = require('cors');
require("./src/db/mongodb");
const auth = require("./src/router/auth");
const listen = 4500
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", auth)
app.listen(listen, () => {
   console.clear()
    console.log(`Server is running on port ::::: http://localhost:${listen}`);
});