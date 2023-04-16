const {sendMailTo }= require('../Utilities/SendMail')
exports.userLoginController = async (req, res, next) => {
  const status = await sendMailTo(['abhardwaj1@kloudrac.com', 'shivamsaini0852@gmail.com'],'http://localhost/5000');
  res.send({"Working": status});
}
