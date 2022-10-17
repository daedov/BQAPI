const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");
const routes = require("./routes/index");

require("dotenv").config();

const URL =
  process.env.NODE_ENV === "development" ? process.env.DB_DEV 
  :
  process.env.NODE_ENV === "test" ? process.env.DB_TEST
  : 
  process.env.DB_PROD;
mongoose
    .connect(URL)
    .then(() => {
        const message = process.env.NODE_ENV === 'development' ? 'Conectado a DB_DEV' 
        :
        process.env.NODE_ENV === 'test' ? 'Conectado a DB_TEST'
        :
        'Conectado a DB_PROD'
    })
    .catch((err) => {
        console.log(err)
    })

app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(
    expressjwt({
        secret: process.env.SECRET, algorithms: ["HS256"],
    }).unless({ path: ["/auth"]  }),
)
app.use(function (err, req, res, next) {
    console.log("unauthorized middleware err:", err)
    if (err.name === "UnauthorizedError") {
        console.log(err)
      res.status(401).send("Token inválido");
      
    } else {
      console.log('--->error.name',err.name)
      next(err);
    }
    next('------->',err)
  });


app.get('/', (req, res) => {
    res.send(<p>API conectada</p>)
})
app.use('/', routes)

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server}