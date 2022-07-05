const SmallLayout =  require("../models").smalllayouts;
const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const crypto = require("crypto");
const AWS = require('aws-sdk');
const fs = require('fs');
const formidable = require('formidable');
const uuidv4 = require('uuid').v4;
const { successResponse ,errorResponse } =  require('../helpers') ;
require('dotenv').config();
const slugify = require('slugify');
// s3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

/* Add Title */
exports.addSmalllayout = async(req, res) => {
    try {
           let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }
        const { user_id, title, content} = fields;
        const { image } = files;
        console.log(user_id);
       
        if (image.size > 2000000) {
            return res.status(400).json({
                error: 'Image should be less than 2mb'
            });
        }
        const params = {
            Bucket: 'sugarcosmetic',
            Key: `banner/${uuidv4()}`,
            Body: fs.readFileSync(image.filepath),
            ACL: 'public-read',
            ContentType: `${image.type}`
        };

        s3.upload(params, (err, data) => {
            if (err) {
                res.status(400).json({ error: 'Upload to s3 failed' });
            }
            // console.log('AWS UPLOAD RES DATA', data);
            const slug = slugify(title);
            let smalllayoutsBanner = { userId: user_id, title: title, content: content, img:data.Key };
            SmallLayout.create(smalllayoutsBanner).then(success=>{
                return successResponse(req, res, success, 'User Added Succefully');
            }).catch();
        });
    });
    } catch (error) {
        return errorResponse(req, res, error.message);
    } 
}

/*Get All Title*/
exports.getSmalllayout = async(req, res) => {
    try {
        const {page, size} = req.body;
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0; 
        const data = await SmallLayout.findAll({  limit: limit, offset:offset});
        return successResponse(req, res, data, 'All Title');
    } catch (error) {
        return errorResponse(req, res, error.message);  
    }
}

/*Update Status of Title*/
exports.updateSmalllayout = async(req, res) => {
    try {
        const {id, status} = req.body;
        const data = await SmallLayout.update({status: status},{where:{id:id}});
        return successResponse(req, res, data, 'Data Update Succefully');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

/*Delete Title*/
exports.deleteSmalllayout = async(req, res) => {
    try {
        const {id} = req.body;
        const data = await SmallLayout.destroy({where:{id:id}});
        return successResponse(req, res, data, 'Data Deleted Succefully');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}


/* Get Title by Id*/
exports.getSmallLayoutById = async(req, res)=>{
    try {
        const {id} = req.body;
        const title = await SmallLayout.findAll({where:{id:id}});
        return successResponse(req, res, title, 'Data Found Succefully');       
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

/* Update Title Data*/
exports.updateSmallLayoutData = async(req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }
            const { id, user_id, title, content, image} = fields;
            const { newimage } = files;
            console.log("Hello Image",image, newimage);
            if (newimage != null) {
                var deleteParam = {
                    Bucket: 'sugarcosmetic',
                    Delete: {
                        Objects: [
                            {Key: image},
                        ]
                    }
                };
                s3.deleteObjects(deleteParam, function(err, data) {
                    if (err) {
                        console.log("Error Object",err.stack);
                        return errorResponse(req, res, error.stack);
                    }
                    // // console.log("Deleted Object",data);
                    // Title.destroy({where:{id:id}}).then(result => {
                    //     return successResponse(req, res, data, 'Data Deleted Succefully');
                    //   }).catch(error => {
                    //     return errorResponse(req, res, error.message);
                    //   })
                });

                console.log("With Image");
                if (newimage.size > 2000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 2mb'
                    });
                }
                const params = {
                    Bucket: 'newsugarcosmetic',
                    Key: `banner/${uuidv4()}`,
                    Body: fs.readFileSync(newimage.filepath),
                    ACL: 'public-read',
                    ContentType: `${newimage.type}`
                };
        
                s3.upload(params, (err, data) => {
                    if (err) {
                        res.status(400).json({ error: 'Upload to s3 failed' });
                    }
                    // console.log('AWS UPLOAD RES DATA', data);
                    const slug = slugify(title);
                    let smalllayoutBanner = { userId: user_id, title: title, content: content, img:data.Key};
                    SmallLayout.update(smalllayoutBanner,{where:{id:id}}).then(success=>{
                        return successResponse(req, res, success, 'User Added Succefully');
                    }).catch();
                });
            }
            else{
                console.log("Without Image");
                let smalllayoutBanner = { userId: user_id, title: title, content: content};
                SmallLayout.update(smalllayoutBanner,{where:{id:id}}).then(success=>{
                    return successResponse(req, res, success, 'User Added Succefully');
                }).catch();
            }
        });
    } catch (error) {
        return errorResponse(req, res, error.message);
   }
}

