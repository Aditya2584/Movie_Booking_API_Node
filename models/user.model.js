const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {USER_ROLE, USER_STATUS} = require("../utils/constants")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "Please Fill a valid Email"], //[RegularExpression, ErrorMessage]
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    userRole:{
        type: String,
        required: true,
        enum: {
            values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
            message: "Invalid user role given"
        },
        default: USER_ROLE.customer,
    },
    userStatus:{
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.approved,USER_STATUS.pending, USER_STATUS.rejected],
            message: "Invalid status given"
        },
        default: USER_STATUS.approved,
    },

}, {timestamps: true});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    // Encrypt the plain password before saving the user.
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidPassword = async function (plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
}

const User = mongoose.model('User', userSchema);
module.exports = User;