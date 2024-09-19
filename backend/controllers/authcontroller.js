const UserCred = require('../models/User');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const test = () => {
    console.log("test");
}

const registerUser = async (req, res) => {
    const payload = await req.body;
    console.log('Payload:', payload);

    const { name, email, password } = payload;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    

    if (!name || !email || !password) {
        console.log('All fields are required');
        return res.status(409).json({ message: "All fields are required" });
    }

    const exist = await UserCred.findOne({ email });
    console.log(exist)
    if (exist) {
        console.log('User already exists');
        return res.status(405).json({ message: "User already exists" });
    } else {
        const hashedPassword = await hashPassword(password); // await the password hashing
        const user = new UserCred({
            name,
            email,
            password: hashedPassword
        });
        user.save();
        console.log('User created');

        return res.status(201).json({ message: "User created" });
    }
}

const loginUser = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const payload = req.body;
        const { email, password } = payload;

        if (!email || !password) {
            console.log('All fields are required');
            return res.status(409).json({ message: "All fields are required" });
        }

        console.log('Finding user with email:', email);
        const user = await UserCred.findOne({ email });

        if (!user) {
            console.log('User does not exist');
            return res.status(404).json({ message: "User does not exist" });
        }

        console.log('Matching passwords');
        const match = await comparePassword(password, user.password);
        if (!match) {
            console.log('Incorrect password');
            return res.status(409).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ email: user.email, id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, {});

        console.log('Setting token cookie');
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        console.log('Sending user response');
        return res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.log('Error occurred during login:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    return res.status(200).json({ message: "Logout successful" });
}

module.exports = {
    test, registerUser, loginUser, getProfile, logout
}