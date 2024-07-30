import express from 'express';

import authRoutes from './routes/authRoutes.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();

const PORT = ENV_VARS.PORT

app.use(express.json());// will allow use to parse req.body

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});

// criskol71