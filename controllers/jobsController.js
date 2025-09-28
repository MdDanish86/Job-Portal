import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

//CREATE JOB
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position) {
        next('Please Provide All Fields');
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
};

//GET JOBS
export const getAllJobsController = async (req, res, next) => {
    const { status, workType , search, sort } = req.query;
    
    const queryObject = {
        createdBy: req.user.userId
    };

    if (status && status !== 'all') {
        queryObject.status = status;
    }
    if(workType && workType!== 'all'){         
        queryObject.workType = workType;
    }
    if(search){
        queryObject.position = {$regex: search, $options:'i'};
    }

    let queryResult = jobsModel.find(queryObject);

    if(sort === 'latest'){
        queryResult = queryResult.sort("-createdAt");
    }
    if(sort === 'oldest'){
        queryResult = queryResult.sort("createdAt");
    }
    if(sort === "a-z"){
        queryResult = queryResult.sort("position");
    }
    if(sort === "z-a"){
        queryResult = queryResult.sort("-position");
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit

    queryResult = queryResult.skip(skip).limit(limit)

    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numOfPgae = Math.ceil(totalJobs/limit)

    const jobs = await queryResult;

    res.status(200).json({
        totalJobs,
        jobs,
        numOfPgae,
    });
};

//UPDATE JOBS 
export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;

    if (!company || !position) {
        next('Please Provide All Fields');
    }

    const job = await jobsModel.findOne({ _id: id });

    if (!job) {
        next(`no jobs found with this id ${id}`);
    }

    if (!req.user.userId === job.createdBy.toString()) {
        next('You are Not Authorized to update this job');
        return;
    }

    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ updateJob });
};

//DELETE JOBS
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;

    const job = await jobsModel.findOne({ _id: id });

    if (!job) {
        next(`No Job Found with this ID ${id}`);
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('You are not Authorized to delete this job');
        return;
    }
    await job.deleteOne();
    res.status(200).json({ message: "Success, Job Deleted !" });
};

//JOBS STATS AND FILTERS
export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: '$statuss', count: { $sum: 1 },
            },
        },
    ]);

    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    };

    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: {
                    $sum: 1,
                },
            }
        },
    ]);
    monthlyApplication = monthlyApplication.map(item => {
        const { _id: { year, month }, count } = item;
        const date = moment().month(month - 1).year(year).format('MMM Y');
        return { date, count };
    })
        .reverse();

    res.status(200).json({ totalJob: stats.length, defaultStats, monthlyApplication });
};



// ✅ NEW FUNCTION: GET LATEST JOBS
export const getLatestJobsController = async (req, res, next) => {
    try {
        const jobs = await jobsModel.find().sort({ createdAt: -1 }).limit(5); // latest 5 jobs
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        next(error);
    }
};
