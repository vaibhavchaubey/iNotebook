const mongoose = require('mongoose');
// const mongoURI = 'mongodb://0.0.0.0:27017/inotebook';
const mongoURI = 'mongodb+srv://admin-vaibhav:Vaibhav777@cluster0.pkaheju.mongodb.net/iNotebook';

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('Connected to Mongo Successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};

// const connectToMongo = () => {
//   mongoose.connect(mongoURI, () => {
//     console.log('Connected to Mongo Successfully');
//   });
// };

module.exports = connectToMongo;
