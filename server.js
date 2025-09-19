// API DOCUMENTATION    
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Packages imports
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

// Security packages
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// Core modules
import path from 'path';
import { fileURLToPath } from 'url';

// Files imports
import connectDB from './config/db.js';

// Routes imports
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoute.js';

// Dotenv config
dotenv.config();

// MongoDB Connection
connectDB();

// Swagger API config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Job Portal Application',
            description: 'Node Expressjs Job Portal Application'
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ['./routes/*.js'],
};

const spec = swaggerJSDoc(options);

// Rest object
const app = express();

// Middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// API Routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// Validation middleware
app.use(errorMiddleware);



// ----------------------------
// ✅ Serve React Frontend in Production
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
// ----------------------------


// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
    console.log(`Node Server Running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgGreen.italic);
});
