// const mongoose = require("mongoose");
// require("dotenv").config();

// express.connect=()=> {
//     mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("DB connected successfully"))
//     .catch((error)=>{
//             console.log("DB connection issues");
//             console.error(error);
//             process.exit(1);
//         });
// };

const mongoose = require("mongoose");
require("dotenv").config();

// Define a function to connect to MongoDB
const connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
        console.log("DB connection issues");
        console.error(error);
        process.exit(1);
    });
};

// Export the connect function
module.exports = { connect };




