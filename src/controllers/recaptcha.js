const Bluebird = require('bluebird');
const Recaptcha = require('recaptcha-v2').Recaptcha;
var request = require('request');

require('dotenv').config();
/**
   * Verify ReCaptcha
   * @param {Object} recaptchaData
   * @returns {Promise}
   */
//  exports.verifyRecaptcha = (recaptchaData) => {
//     if (process.env.RECAPTCHA_SKIP_ENABLED === 'true') { // For development purpose only, you need to add SKIP_ENABLED in .env
//       return Bluebird.resolve();
//     } 
 
//     return new Bluebird((resolve, reject) => {
//       const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY, recaptchaData);
 
//       recaptcha.verify((success) => {
//         if (success) {
//           return resolve();
//         }
 
//   reject(new Error());
//       });
//     });
//   };


exports.verifyRecaptcha = async(recaptchaData) => {
  
  const secret =process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaData}`;
  // const res = await fetch(,{
  //   method : "POST"
  // })
  // const data = await res.json();
  // console.log(data);
  // return data;

  await request.post(
    url,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
              
            const data =  JSON.parse(body)
            console.log(data.success)
            return data.success;
           
        }
    }
);


}

