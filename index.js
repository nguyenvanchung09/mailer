var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.set('views', './views');

var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

app.listen(3000);

var transporter = nodemailer.createTransport({
    host: 'smpt.gmail.com',
    port: 587,
    secure: true,
    auth: {
        username: 'khoaphamacb@gmail.com',
        pass: 'khoapham123'
    }
});

transporter.use('compile', hbs({
    viewPath: 'views',
    extName: '.ejs'
}));

app.get('/', function(req, res) {
    res.render('form')
});

app.post('/mail', urlencodedParser, function(req, res) {
    var username = req.body.ten;
    var email = req.body.email;
    var password = req.body.password;
    transporter.sendMail({
        from: 'khoaphamacb@gmail.com',
        to: email,
        subject: 'NODEJS KHOA PHAM',
        template: 'mail',
        context: {
            username,
            email,
            password
        }
    }, function(err, response) {
        if (err) {
            res.send('that bai');
            console.log(err);
        } else {
            res.send('thanh cong')
        }
    });
});