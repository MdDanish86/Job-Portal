import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController, getLatestJobsController } from '../controllers/jobsController.js';

const router = express.Router()

//Routes
//CREATE JOB || POST 
router.post('/create-job',userAuth, createJobController);

//GET JOBS || GET
router.get('/get-job', userAuth, getAllJobsController);

//UPDATE JOBS  || PATCH 
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id",userAuth, deleteJobController);

//DELETE STATS FILTER || GET
router.get("/job-stats",userAuth, jobStatsController);

router.get('/latest', getLatestJobsController);

export default router;
