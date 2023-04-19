const JWT = require('jsonwebtoken');
const {sendMailTo }= require('../Utilities/SendMail')
const signupModel = require('../Models/signupModel');
const Constants= require("../Utilities/Constants");
const { verify_success  } = require('../Utilities/HTMLs')
const { VERIFY_ROUTE, VERIFY_USER, HOST_URL, JWT_SECRET } = Constants;

exports.userSignup = async(req, res) => {
  try {    
    const newUser = req.body;
    const user = await signupModel(newUser).save(); // in DB
    const token = JWT.sign({userID: user['id']}, JWT_SECRET, { expiresIn: '300s' }); // 5 minutes expire
    const link = `${HOST_URL}${req.baseUrl}${VERIFY_ROUTE}?${VERIFY_USER}=${token}`;
    const emailStatus = await sendMailTo([newUser?.email], link);
    if(emailStatus?.accepted?.length) {
      res.status(200).send({msg: 'User Created Successfully', link});
    } else {
      throw Error('Unable to send Email!');
    }
  } catch (error) {
    console.log('userController.userSignup', error)
    throw Error('Unable to crate user');
  }
}

exports.userVerify = async (req, res) => {
   const { userID } = req.authToken;
   const status = await signupModel.findOneAndUpdate({_id: userID},{
    isVerified: true,
    updatedOn: new Date()
   }, { new: true, upsert: true })
    if('_id' in status) {
      res.send(verify_success());
    }
};

exports.userLogin = (req, res) => {
  // TODO Bcrypt in Utils
  try {
   const token = JWT.sign({userID: req.user?._id}, JWT_SECRET, { expiresIn: '8h' });
    res.status(200).send({token});
  } catch (error) {
    new Error(error.message);
  }
}


