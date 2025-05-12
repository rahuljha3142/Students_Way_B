const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Define the User schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,   
  },
  email: {
    type: String,
    required: true,
    unique: true,   
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "parent", "teacher", "student"],
    default: "student",
  },
});

// secure the password with the bcrypt
userSchema.pre('save', async function(next){      // pre method
  // console.log("pre method", this);

  const user = this;

  if(!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});


// compare the password 

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
}


// json web token 
userSchema.methods.generateToken = async function() {     // instance method
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
      role: this.role,
    },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
  );
  } catch (error) {
    console.error(error);
  }
}  

// define the model or the collection name
const User = new mongoose.model("USER", userSchema);

module.exports = User;