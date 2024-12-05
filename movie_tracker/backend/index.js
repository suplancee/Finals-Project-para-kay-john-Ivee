
const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const movieRoutes = require("./route/Movie-Routes.js");

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());
app.use("/movies", movieRoutes);


const port = process.env.PORT || 3000;
console.log('Port being used:', port);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});