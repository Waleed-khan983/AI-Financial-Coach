import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';


const generateToken = (id) => {

    return jwt.sign(
        { userId: id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}


// register user
export const registerUser = async (req, res, next) => {
    try {

        const { username, email, password, confirmPassword } = req.body;


        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                status: 400,
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
                status: 400,
            })
        }

        const user = await User.findOne({ email });
 
        

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
        })


        res.status(200).json({
            success: true,
            message: "User created successfully",
            status: 200,
            username,
            email
             


        })


    } catch (err) {
        next(err)
    }
}


// login user
export const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                status: 404
            })
        }  

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
                status: 400
            })
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            status: 200,
            username: user.username,
            email: user.email,
            token


        })


    } catch (err) {
        next(err)
    }
}