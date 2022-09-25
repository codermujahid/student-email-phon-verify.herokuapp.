const dotenv = require('dotenv').config();
 
 
const twilio = require('twilio')(process.env.SID, process.env.AUTH_TOKEN);
   
const twilio_cell = process.env.TWILO_CELL;

 

// Create SMS
const sendSMS = (to, sms) => {

    twilio.messages.create({
        from : twilio_cell,
        to : to,
        body : sms
    })
    .then( res => {
        console.log('sms sent successfully');
    })
     .catch( error => {
        console.log(error.message);
     })


}
//export
module.exports = sendSMS;

