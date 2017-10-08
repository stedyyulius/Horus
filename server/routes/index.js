var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'jago3333steve@gmail.com',
        pass: '123gwkeren'
    }
}));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendEmail', function(req, res, next) {
    var job = {
    from:`Horus <horus@gmail.com>`,
    to: `stedy.yulius@orori.com`,
    subject: `Horus Invoice`,
    text: 'Done',
    html: `<img src=${req.body.image} height="200" width="200">`
  }

  transport.sendMail(job, (error, info) => {
          if (error) {
            console.log(error);
            res.send(error);
          }
          else{
            console.log(`sukses`);
            res.send('success!')
          }
      });

});

const accept = () =>{
  console.log(`halo`);
}


module.exports = router;
