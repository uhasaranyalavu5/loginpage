const bodyParser = require('body-parser');
const exp = require("express");
const app = exp();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine","ejs");

const users = require('./models/userModel.js');

app.listen(3000,()=>{
    console.log("listening on port 3000");
});

app.get("/",(req,res)=>{
    res.send("You are in home page go to login page or signup page");
});

app.get('/login',(req,res)=>{
    res.render('login.ejs');
});

app.post('/login', async (req,res) => {
    let {username,password} = req.body;
    
    const currentUser = await users.findOne({username});
    if(currentUser && currentUser.password == password) {
        res.render('welcome.ejs',{username});
    } else if ( currentUser && currentUser.password != password) {
        res.redirect('/login?message=incorrect-password');
    }else{
        res.redirect('/login?message=nouser');
    }
});



app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await users.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.redirect('/login?message=userexists');
        }

        // Create a new user and save it to the database
        const newUser = new users({ username, email, password });
        await newUser.save();

        // Redirect to login page after successful signup
        res.redirect('/login?message=signup-success');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

app.get("*",(req,res)=>{
    res.render('error.ejs');
})