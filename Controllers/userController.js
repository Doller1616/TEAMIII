const { createJWT } = require('../Utilities/JWTconfig')
const {sendMailTo }= require('../Utilities/SendMail')
const signupModel = require('../Models/signupModel');
const Constants= require("../Utilities/Constants");
const { verify_success  } = require('../Utilities/HTMLs')
const { VERIFY_ROUTE, VERIFY_USER, HOST_URL } = Constants;

exports.userSignup = async(req, res) => {
  try {    
    const newUser = req.body;
    const user = await signupModel(newUser).save(); // in DB
    const token = await createJWT(user['id'],'300s'); // 5 minutes expire
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
    //  TO DO Token Expire
    if('_id' in status) {
      res.send(verify_success());
    }
};

exports.userLogin = async (req, res) => {
  try {
    const token = await createJWT(req.user?._id, '8h');
    res.send({token});
  } catch (error) {
    new Error(error.message);
  }
}


