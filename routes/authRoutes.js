import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'
import rateLimit from 'express-rate-limit';

//ip limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})

//router object...
const router = express.Router()

//routes
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user collection
 *           example : DHSASDHJDJHVAJDSVJAVSD
 *         name:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           description: User email address
 *         password:
 *           type: string
 *           description: User password should be greater than 6 characters
 *         location:
 *           type: string
 *           description: User location (city or country)
 *       example:
 *         id: GDHJGD788BJBJ
 *         name: John
 *         lastName: Doe
 *         email: johndoe@gmail.com
 *         password: test@123
 *         location: mumbai
 */



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description:  authentication apis
 */


/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *     summary: register new user
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *     content:
 *       application/json:
 *          schema: 
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *          description: user created successfully
 *          content: 
 *             application/json:
 *               schema:
 *                  $ref: '#/components/schemas/User'
 *       500:
 *          desciption: Internal Server Error
 */


//REGISTER || POST 
router.post('/register', limiter, registerController);


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *    summary: login page
 *    tags: [Auth]
 *    requestBody:
 *      requred: true
 *      content:
 *          application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *         description: login successfull
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *      500:
 *        description: something went wrong
 */


//LOGIN || POST
router.post('/login', limiter, loginController);

//exports
export default router;
