// API DOCUMENTATION    
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
//packages imports..
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';


//security packages...
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';


//files imports..
import connectDB from './config/db.js';


//routes import..
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoute.js';

//Dot env config
dotenv.config();

//mongoDB Connection.
connectDB();

// swagger api config
// swaggerapi options
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


//rest object
const app = express()


//middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);

//homeroute
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));


//validation middleware
app.use(errorMiddleware);

//port 
const PORT = process.env.PORT || 8080


//Listen
app.listen(PORT, () => {
    console.log(`Node Server Running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgGreen.italic);
});