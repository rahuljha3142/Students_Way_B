const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
  };
  

  const register = async (req, res) => {
    try {
      // console.log(req.body);

      const { fullName, username, email, password, role } = req.body;

      const userExist = await User.findOne({email:email});

      if(userExist) {
        return res.status(400).json({ message: "email already exists" });
      }

      // hash the password
      // const saltRound = 10;
      // const hash_password = await bcrypt.hash(password, saltRound);

      const userCreated = await User.create({ fullName, username, email, password, role });

      res.status(201).json({
        message: "registration successfull", 
        token: await userCreated.generateToken(), 
        userId: userCreated._id.toString(),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };


  const login = async(req, res) => {
    try { 
      const{username, password} = req.body;

      const userExist = await User.findOne({username});
      console.log(userExist);

      if(!userExist) {
        return res.status(400).json({message: "Invalid credentials"});
      }

      // compare password
      // const user = await bcrypt.compare(password, userExist.password);

      const user  = await userExist.comparePassword(password);

      if(user) {
        res.status(200).json({
          message: "Login successfull", 
          token: await userExist.generateToken(), 
          userId: userExist._id.toString(),
        });
      } else 
        res.status(401).json({message: "Invalid email or password"});
      
    } catch (error) {
      res.status(500).json("Internal server error")
      // next(error);
    }
  }
  
  module.exports = { home, register, login };