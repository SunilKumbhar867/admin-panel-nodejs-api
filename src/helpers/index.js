exports.successResponse = (req, res, data, success ,code = 200) => res.send({
	code,
	data,
	success: success,
});

exports.errorResponse = (
	req,
	res,
	errorMessage = 'Something went wrong',
	code = 500,
	error = {},
) => res.status(code).json({
	code,
	errorMessage,
	error,
	data: null,
	success: false,
});

