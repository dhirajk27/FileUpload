const File  = require("../models/File");
const cloudinary  = require("cloudinary").v2;
 
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
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    console.log("temp file path",file.tempFilePath);
    if(quality){
        options.quality = quality;
    }
    options.resource_type= "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// image upload 
exports.imageUpload = async(req,res)=>{
    try {
        //fetch file
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

       // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);
        
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.this.status(400).json({
                success:false,
                message:'File format is not supported',
            })
        }

        // file format supported hai 
        console.log("Uploaded to fileupload");
        const response = await uploadFileToCloudinary(file,"fileupload")
        console.log(response);

        // Store the entry In Database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,           
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        })

    }
}


// video upload 
exports.videoUpload = async(req,res)=>{
    try {
        //fetch file
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;

       // validation
        const supportedTypes = ["mp4","mov","mkv"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);
        // Add a upper limit of 5 mb 


        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.this.status(400).json({
                success:false,
                message:'File format is not supported',
            })
        }

        // file format supported hai 
        console.log("Uploaded to fileupload");
        const response = await uploadFileToCloudinary(file,"fileupload")
        console.log(response);

        // Store the entry In Database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,         
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video successfully uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        })

    }
}

// image_Size_Reducer

exports.imageSizeReducer = async(req,res)=>{
    try {
        //fetch file
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

       // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);
        
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.this.status(400).json({
                success:false,
                message:'File format is not supported',
            })
        }

        // file format supported hai 
        console.log("Uploaded to fileupload");
        const response = await uploadFileToCloudinary(file,"fileupload",60)
        console.log(response);

        // Store the entry In Database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,           
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        })

    }
}