const File  = require("../models/File");

// local fileupload->handler function 

exports.localFileUpload = async(req,res)=>{
    try {
        //fetch file
        const file = req.files.file;
        console.log("File recieved",file);

        //create path where file need to be stored on server 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.').pop()}`;
        console.log("Path->",path);

        //add path to move function
        file.mv(path,(err)=>{
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:"Local File uploaded successfully",
        });
    } catch (error) {
        console.log("Not able to upload the file on server");
        console.log(error);
    }
}