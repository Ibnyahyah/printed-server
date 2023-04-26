const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');


function generateToken(data) {
    return JWT.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5y",
    });
}


const register = async (req, res) => {
    const { firstName, lastName, email, phone, password, address, town, state, alternativePhone } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'user already exist' });
        const isFirstUser = await User.countDocuments() === 0;
        const _role = isFirstUser ? 'admin' : "user";
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt)
        if (isFirstUser) {
            await User.create({ email, firstName, lastName, phone, password: hashedPassword, role: 'admin' });
        } else {
            await User.create({
                email, firstName, lastName, phone, password: hashedPassword, role: _role.toLowerCase(), deliveryAddress: {
                    town: town,
                    state: state,
                    address: address,
                },
                alternativePhone
            });
        }
        res.status(201).json({ message: "Account created successfully" });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong', error: e.message });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) return res.status(404).json({ message: 'Password incorrect' });

        const token = generateToken(user);
        res.status(200).json({ message: 'User Successfully logged in', token: token, user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


module.exports = { signIn, register };