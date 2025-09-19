import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    const { name, lastName, email, password } = req.body;

    // validate
    if (!name) {
        // return res.status(400).send({success:false,message:'please proivde name'});
        next("name is required");
    }
    if (!email) {
        // return res.status(400).send({success:false,message:'please provide email'});
        next("email is required!");
    }
    if (!password) {
        // return res.status(400).send({success:false,message:'please provide password'});
        next("Password is required");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(200).send({
            success: false,
            message: 'Email Already Registered Please Login'
        });
    }

    const user = await userModel.create({ name, lastName, email, password });
    // token
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: 'User Created Successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token,
    });
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
        next('Please Provide All Fields');
    }

    // find user by email
    const user = await userModel.findOne({ email }).select("+passwrod")
    if (!user) {
        next('Invalid Username or Passwrod');
    }

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        next('Invalid Username or Password');
    }

    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: "Login Successfully",
        user,
        token,
    });
};
