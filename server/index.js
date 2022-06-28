const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const catchAsync = require("./catchAsync");
app.use(bodyParser.json());
app.use(cors());

app.post("/send_mail", cors(), (req, res) => {
  let { text, subject } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: "ashutoshverma5555@gmail.com",
    subject,
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your email!</h2>
        <p>${text}</p>
         </div>
    `,
  };
  await transporter.sendMail(mailOptions).then(()=>{
    return res.status(200).json({
      status: 'success',
    })

  }).catch(err=>{
    return res.status(404).json({
      status:'fail'
    })
  });
});
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
