const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/List");

const app = express();
const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;
mongoose.connect(process.env.db_url)
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log('not connected');
  });

mongoose.connection.on("error", (err) => {
    console.log(err);
});

mongoose.connection.on("connected", (err, res) => {
    console.log("Database connection successful!");
});

// Middleware
app.use(express.json());
app.get('/list', async (req, res) => {
    const x = await User.find({});
    return res.status(201).json({user:x});
});

app.post('/addUser',async (req,res) => {

  //7.1
  try{
      const {firstName,lastName,phoneNumber,countryCode,id} = req.body;

      if(!firstName|| !lastName|| !phoneNumber || !countryCode || !id){
          return res.status(422).json({error:"please fill the form correctly"});
      }

      const userInfo = await User.findOne({id:id,firstName:firstName,lastName:lastName,phoneNumer:phoneNumber,countryCode:countryCode});

      if(userInfo){
         return  res.status(422).json({error:"user  already exist"});
      }
      else{
          const user = new User({firstName,lastName,phoneNumber,countryCode,id});

          await user.save();
          res.status(200).json({messgae:"add user successfull"});
      }
  }
  catch(err){
      console.log(error);
  }

})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});