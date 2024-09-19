const mongoose = require('mongoose');


const credConnection = ()=> {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('db connected')
        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = credConnection