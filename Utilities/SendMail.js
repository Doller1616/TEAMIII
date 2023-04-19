const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = "999607296431-p7fvddq5b9op7dl4k2sh847dbr4c3v2o.apps.go...";
const CLIENT_SECRET = "GOCSPX-AslqspiDao2D0RD...";
const REFRESH_TOKEN = "1//04p95SxxxR8NMCgYIARAAGAQSNwF-L9IrUyenjlM0W05lSgrvwEqr99o6ztaPqo2xC-zhCyyJF4Ne4N...";

const OAuth2_client = new OAuth2(CLIENT_ID, CLIENT_SECRET);
OAuth2_client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendMailTo = async (toEmail, link) => {
    const accessToken = OAuth2_client.getAccessToken();
    const mailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAUTH2',
            user: 'adagoitsolutions@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken
        }
    });

    const mail_options = {
        from: 'adagoitsolutions@gmail.com',
        to: toEmail,
        subject: 'Verify Account',
        text: 'Account Authantication',
        html: `<a href=${link} >
         <button style="color: green"> Verify Account </button>
          </a>`
    };

    const result = new Promise((resolve, reject) => {

        mailer.sendMail(mail_options, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res);
            mailer.close();
        });

    })

    return await result
}