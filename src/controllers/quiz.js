const Quiz =  require("../models").quizs;
const { successResponse ,errorResponse } =  require('../helpers') ;
require('dotenv').config();


/* Add Title */
exports.addQuestion = async(req, res) => {
    try {
        const {userId, question, opt1, opt2, opt3, opt4, ans } = req.body;
        let quiz = {userId:userId, question:question, opt1:opt1, opt2:opt2, opt3:opt3, opt4:opt4, ans:ans };
        const success = await Quiz.create(quiz);
        return successResponse(req, res, success, 'User Added Succefully');
    } catch (error) {
        return errorResponse(req, res, error.message);
    } 
}

/*Get All Question*/
exports.getQuestion = async(req, res) => {
    try {
        const {page, size} = req.body;
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0; 
        const data = await Quiz.findAll({  limit: limit, offset:offset});
        return successResponse(req, res, data, 'All Title');
    } catch (error) {
        return errorResponse(req, res, error.message);  
    }
}

/*Update Status of Quiz*/
exports.updateStatus = async(req, res) => {
    try {
        const {id, status} = req.body;
        const data = await Quiz.update({status: status},{where:{id:id}});
        return successResponse(req, res, data, 'Data Update Succefully');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

/*Delete Quiz*/
exports.deleteQuestion = async(req, res) => {
    try {
        const {id} = req.body;
        const data = await Quiz.destroy({where:{id:id}});
        return successResponse(req, res, data, 'Data Deleted Succefully');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

/* Verify Answer */
exports.verifyQuestion = async(req, res) =>{
    try {
        var score = 0;
        const quiz_data = await Quiz.findAll();
        req.body.map((data, index)=>{
            quiz_data.map((res_data, res_index) => {
                if (data.id === res_data.id && data.ans === res_data.ans) {
                    console.log("Id Match");
                    score++;
                }
            });
        });
        return successResponse(req, res, score, 'Score Found');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

/* Update Question Data */
exports.updateQuestion = async(req, res) => {
    try { 
        const {id, userId, question, opt1, opt2, opt3, opt4, ans } = req.body;
        data = await Quiz.update(req.body,{where:{id:id}})
        return successResponse(req, res, data, 'Score Found');
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

/*Get Quiz by ID*/
exports.getQuizById = async(req, res) => {
try {
    const {id} = req.body;
        const title = await Quiz.findAll({where:{id:id}});
        return successResponse(req, res, title, 'Data Found Succefully');
} catch (error) {
    return errorResponse(req, res, error.message);
}
}