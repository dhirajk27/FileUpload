const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    emails: {
        type: String,
    },
});
// post middleware
fileSchema.post("save",async function(doc){
    try {
        console.log("Doc",doc)

        // transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        // mail send 
        let info = await transporter.sendMail({
            from:``,
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html: `
            <h2>Hello,</h2>
            <p>Your file has been uploaded successfully.</p>
            <p>View it here: <a href="${doc.imageUrl}">${doc.name}</a></p>
        `, 
        })
        console.log("Info",info);
        

    } catch (error) {
        console.error(error);
    }
})
const File = mongoose.model("File", fileSchema);
module.exports = File;
