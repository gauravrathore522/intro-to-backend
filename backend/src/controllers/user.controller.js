import { User } from '../models/user.model.js';

// register new user
const registerUser =  async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() })

        if(existing) {
            return res.status(400).json({ message: "User already exists" })
        }

        //create new user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registers successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch(error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// login user
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        //compare passwords
        const isMatch = await user.comparePasswords(password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            message: "User Logged in Successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch(error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

    
}

// logout user
const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user  = User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error", error: error.message
        })
    }
}

export { registerUser, loginUser, logoutUser };