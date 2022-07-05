const User = require("../models").users;
const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const crypto = require("crypto");
const AWS = require('aws-sdk');
const fs = require('fs');
const formidable = require('formidable');
const uuidv4 = require('uuid').v4;
const { successResponse, errorResponse } = require('../helpers');

const recaptchaHelpers = require('./recaptcha');

var _ = require('underscore');
require('dotenv').config();
// const _ = require('lodash');
// const fs = require('fs');


// s3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


/* Add Admin User*/
exports.addAdminUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        const username = shortId.generate();
        const reqPass = crypto.createHash('md5').update(password).digest('hex');
        const payload = { username: username, name: name, email: email, mobile: mobile, password: reqPass };
        const success = await User.create(payload);
        return successResponse(req, res, success, 'User Added Succefully');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}


/* User Login */
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // const recaptchaData = {
        //     remoteip: req.connection.remoteAddress,
        //     response: _.get(req.body.captchaToken, 'recaptchaResponse'),
        //     secret: process.env.RECAPTCHA_SECRET_KEY,
        // };


        var secretKey = '6Lf8q5wgAAAAAD6ueJdHoCy-n5107yFLDrkvImKT';
        var verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captchaToken}&remoteip=${req.connection.remoteAddress}`;
        console.log(req.body);
        const recaptcha = await recaptchaHelpers.verifyRecaptcha(req.body.captchaToken);
        console.log(recaptcha);
        

        const success = await User.findOne({ where: { email: email } });

        if (!success) {
            return clientErrorResponse(req, res, { message: 'User with that email does not exist, Please register.' },
                'User with that mobile does not exist, Please register.', '0');
        }
        const reqPass = crypto.createHash('md5').update(password).digest('hex');
        if (reqPass !== success.password) {
            return clientErrorResponse(req, res, { message: 'Mobile and password not match' },
                'Mobile and password not match', '01');

        }

        //generate token and send to the client
        const token = jwt.sign({ _id: success._id }, process.env.JWT_SECRET, {
            expiresIn: '365d'
        });

        //const { _id, username, name, mobile, email, role } = success;
        if(!recaptcha){
            // res.status(400);
            // res.json({error : ['Please ,you are not folling us , bot']});
            return successResponse(req, res, { success, token }, 'Login succefully');
        
        }else{
            return 
        }
            
       
           
    } catch (error) {
        return errorResponse(req, res, error.message);
    }

}

exports.adminUser = async (req, res) => {
    try {
        const user = await User.findAll();
        return successResponse(req, res, user, 'All User');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

/* Add Image */
exports.addImage = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }
            // console.table({err, fields, files})
            // const { user_id, title, content, role } = fields;
            const { image } = files;
            // console.log(image);
            console.log(image.filepath);
            // console.log(fields);
            // const slug = slugify(title);
            // let carousel = new Carousel({ user_id: user_id, title: title, content: content, role: role, slug: slug });
            // console.log(carousel, "Hello World");

            if (image.size > 2000000) {
                return res.status(400).json({
                    error: 'Image should be less than 2mb'
                });
            }
            // upload image to s3
            const params = {
                Bucket: 'newsugarcosmetic',
                Key: 'banner/sequence.json',
                Body: fs.readFileSync(image.filepath),
                ACL: 'public-read',
                ContentType: `${image.type}`
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    // console.log(err);
                    res.status(400).json({ error: 'Upload to s3 failed' });
                }
                console.log('AWS UPLOAD RES DATA', data);
                // carousel.image.url = data.Location;
                // carousel.img = data.Key;
                return successResponse(req, res, data, 'Carousel added succefully');
                // return successResponse(req, res, data )
                // save to db
                // console.log(carousel);
                // carousel.save((error, success) => {
                //     if (error) {
                //         // console.log(error);
                //         //res.status(400).json({ error: 'Duplicate category' });
                //         return errorResponse(req, res, { error: 'Duplicate category' });
                //     }
                //     return successResponse(req, res, success, 'Carousel added succefully');
                // });
            });
        });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}