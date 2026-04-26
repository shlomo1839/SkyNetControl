import express from "express";
import cors from "cors";
import "dotenv/config";
import sequelize from "./config/db.js";
import aircraftRouter from "./routes/aircraftRouter.js";
import aircraftTypeRouter from './routes/aircraftTypeRouter.js';
import flightsRoutes from './routes/flightRoutes.js';

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));

app.use(express.json());
app.use("/api/aircraft", aircraftRouter)
app.use("/api/aircraft-types", aircraftTypeRouter);
app.use('/api/flights', flightsRoutes)



const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to MySQL has been established successfully.");

    // make shure not doubled tables
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database or sync models:", error);
  }
};

startServer();