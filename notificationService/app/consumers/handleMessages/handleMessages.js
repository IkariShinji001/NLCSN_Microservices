const Nodemailer = require('../../mailService/nodemailer');
const getMailTemplate = require('../../mailService/getMailTemplates');

class HandleMessages{
  async sendMailResetPassword(message){
    try {
      const nodemailer = new Nodemailer();
      const verificationLink = `http://localhost:10000/reset-password?user_id=${message.id}`
      await nodemailer.sendMail(message.email, 'Đặt lại mật khẩu',
       getMailTemplate.forgotPasswordTemplate(message.email, verificationLink ));
    } catch (error) {
      console.log(error);      
    } 
  }
}

module.exports = new HandleMessages();