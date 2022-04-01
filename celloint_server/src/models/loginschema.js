const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

const loginschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phoneno:{
        type:Number,
        required: true,
        trim: true
    },
    dateofbirth: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    addtocarts: [],
    messages: [
        {
            username: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                trim: true
            },
            message: {
                type: String,
                required: true
            },
            phoneno: {
                type: Number,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});



loginschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

loginschema.methods.getlogintoken = async function () {
    try {
        const tokengen = await jwt.sign({ _id: this._id }, "mynameissalmanandilovetocode");
        // const hashtoken= await bcrypt.hash(tokengen,10);
        this.tokens = this.tokens.concat({ token: tokengen });
        this.save();
        return tokengen;
    }
    catch (e) {
        res.send("login_token error" + e);
    }
}

loginschema.methods.adddata = async function (username, email, message, phoneno) {
    try {

        this.messages = this.messages.concat({ username, email, message, phoneno });
        await this.save();
        return this.messages;
    }
    catch (e) {
        res.send("adddata error" + e);
    }
}

loginschema.methods.addtocart = async function (newaddtocart) {
    try {
        this.addtocarts = this.addtocarts.concat({ ...newaddtocart });
        // console.log("thisaddtocart ", this.addtocarts);
        console.log("newaddtocart ", newaddtocart);
        await this.save();
        return this.addtocarts;
    }
    catch (e) {
        console.log("newaddtocart errror ", e);
    }
}
loginschema.methods.addtocartall = async function (newaddtocart) {
    try {
        this.addtocarts = newaddtocart;
        console.log("thisaddtocart all ", this.addtocarts);
        console.log("newaddtocart all ", newaddtocart);
        await this.save();
        return this.addtocarts;
    }
    catch (e) {
        console.log("addtocartall errror ", e);
    }
}


const Loginmens = new mongoose.model("customers", loginschema);
module.exports = Loginmens;