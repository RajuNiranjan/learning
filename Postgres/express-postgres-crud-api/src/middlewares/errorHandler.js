export const errorHandler = (err, req, res, next) =>{
    console.log(err);
    res.status(500).json({
        message: "Error",
        status:500,
        error: err.message
    })
}