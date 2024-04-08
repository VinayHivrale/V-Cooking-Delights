require("dotenv").config();
require('express-async-errors');
const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");

app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();




const Recipe = require('./models/Recipe');
const Area = require('./models/Area');



async function printUniqueAreas() {
  try {
    const areas = await Recipe.distinct('strArea');
    console.log('Unique Areas:', areas);
  } catch (error) {
    console.error('Error fetching unique areas:', error);
  }
}

  

