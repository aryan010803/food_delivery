const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://GoFood:urhBDDfPnro9kBAu@cluster0.8wdlmig.mongodb.net/GoFood?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        
        const fetched_data = await mongoose.connection.db.collection("sample");
        const data = await fetched_data.find({}).toArray();
        const food_cata = await mongoose.connection.db.collection("sample2");
        const data2 = await food_cata.find({}).toArray();
        global.food_item = data;
        global.food_cat  = data2;
       
    } catch (err) {
        console.error("Error:", err.message);
    }
};
   


module.exports = mongoDB;
