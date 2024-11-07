const mongoose = require('mongoose');

main().then(()=>{
    console.log("mongodb connected");   
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://kannareddytiyyagura:shine%23non7@cluster0.ruhjg.mongodb.net/sumappp').then(()=>{console.log("db connected")});
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Regular expression for email validation
  },
  password: { type: String, required: true }
});

let userModel = mongoose.model.users || mongoose.model("users",userSchema);
module.exports = userModel;
