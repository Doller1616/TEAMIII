const { createJWT } = require('../Utilities/JWTconfig')
const {sendMailTo }= require('../Utilities/SendMail')
const signupModel = require('../Models/signupModel');

exports.userSignup = async(req, res) => {
  try {    
    const newUser = req.body;
    const user = await signupModel(newUser).save(); // in DB
    const token = await createJWT(user['_id'],'1h');
    const link = `http://localhost:5000/api/v1/verify?id=${token}`
    const sentStatus = await sendMailTo([newUser?.email], link);

    res.status(200).send({msg: 'User Created Successfully', sentStatus});
  } catch (error) {
    console.log('userController.userSignup', error)
    throw Error('Unable to crate user');
  }
}

exports.userVerify = async (req, res) => {
   const {userID} = req.query;
   const status = await signupModel.findOneAndUpdate({_id: userID},{
    isVerified: true,
    updatedOn: new Date()
   }, { new: true, upsert: true })

   res.send({status});
};

exports.userLogin = async (req, res) => {
  try {
    const token = await createJWT('12345', '60');
    res.send({token});
  } catch (error) {
    new Error(error.message);
  }
}


