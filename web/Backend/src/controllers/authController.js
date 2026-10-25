import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import bcrypt, { compare } from 'bcryptjs';


// generate token
const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}


//signup user 
export const registerUser = async (req, res) => {
    try {
        const {name, email, phone, password, role} = req.body;

        const existUser = await User.findOne({ email });
        if(existUser) {
            return res.status(400).json({message: "User is already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id)
        })
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}


//Login user 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check for missing input parameters
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password." });
        }

        // 2. Fetch user and explicitly include the password field
        const user = await User.findOne({ email });

        // 3. Verify user existence and compare passwords safely
        if (user && (await bcrypt.compare(password, user.password))) {
            
            // 4. Return success response (EXCLUDING the password hash)
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                company: user.company,
                address: user.address,
                bio: user.bio,
                joinedDate: user.joinedDate,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: generateToken(user._id)
            });
        } 
        
        // 5. Generic error message for failed authentication to prevent email enumeration
        return res.status(401).json({ message: "Invalid email or password." });

    } catch (error) {
        // 6. Handle server-side errors safely
        return res.status(500).json({ message: "Internal server error." });
    }
};