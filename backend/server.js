import express from 'express';

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();

const PORT = ENV_VARS.PORT

app.use(express.json());// will allow use to parse req.body

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes)

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});

