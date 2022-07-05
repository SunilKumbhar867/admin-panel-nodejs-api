const fs = require('fs');
const Gift =  require("../models").gifts;
const Title =  require("../models").titles;
const Sliding =  require("../models").slidings;
const SmallLayout =  require("../models").smalllayouts;
const Blog = require("../models").blogs;
const AWS = require('aws-sdk');
const { successResponse ,errorResponse } =  require('../helpers') ;
const user = [
    {
      "sequence":[]
    },
    {
      "titlebanner":[]
    },
    {
      "slidingbanner":[]
    },
    {
      "smalllayout":[]
    },
    {
      "gift":[]
    },
    {
      "blog":[]
    }
]

// s3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


exports.sequence = async(req, res)=> {
    try {
        const {sequence} = req.body;
        console.log(req.body);
        sequence.map((value, index)=>{
            user[0].sequence.push(value.value)
        })
        const gift = await Gift.findAll();
        const title = await Title.findAll();
        const sliding = await Sliding.findAll();
        const smalllayout = await SmallLayout.findAll();
        const blog = await Blog.findAll();
        // console.log(gift, title, sliding, smalllayout);
        // const data = JSON.stringify(user);
        // user[0].sequence.push("titlebanner","slidingbanner","smalllayout","gift","fireworks","quiz","blog","registerationform","contact")
        
        await title.map((data, index)=>{
            user[1].titlebanner.push(data)
        });
        await sliding.map((data, index)=>{
            user[2].slidingbanner.push(data)
        });
        await smalllayout.map((data, index)=>{
            user[3].smalllayout.push(data)
        });
        await gift.map((data, index)=>{
            user[4].gift.push(data)
        });
        await blog.map((data, index)=>{
            user[5].blog.push(data)
        });
        // write JSON string to a file
        const data = JSON.stringify(user);
        await fs.writeFile('sequence.json', data, (err) => {
            if (err) {
                throw err;
            }
        
        const params = {
            Bucket: 'sugarcosmetic',
            Key: 'config/sequence.json',
            Body: fs.readFileSync('D:/sugar/backend/sequence.json'),
            ACL: 'public-read',
            ContentType: 'application/json'
        };
        s3.upload(params, (err, data) => {
            if (err) {
                res.status(400).json({ error: 'Upload to s3 failed' });
            }
            else if(data){
                console.log('NEW UPLOAD RES DATA', data);
                return successResponse(req, res,data, "Data Uploaded");
            }        
            else{
                return successResponse(req, res,"Data Saved", "Data Uploaded");
            }
        });
        });      
    } catch (error) {
        
    }
}