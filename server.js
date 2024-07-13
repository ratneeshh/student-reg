const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json()) ;
const path =require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use body-parser to parse JSON (the content-type of the request)
app.use(bodyParser.json());

const atlasuri ='mongodb+srv://useratnesh:ratnesh321@cluster0.tuu2ppa.mongodb.net/test2?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(atlasuri,{
  useNewUrlParser: true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log("Connected to Mongodb Atlas");
})
.catch((err)=>{
  console.log("Error connecting to Mongodb Atlas",err);
});

// Define a schema for students
const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String
});

// Create a model for students
const Student = mongoose.model('Student', studentSchema);

// Route for student form submission


app.post('/submit_student_form', async (req,res) => {
    console.log("body is ",req.body);
    const newStudent = new Student({
        name: req.body.name,
        rollNumber : req.body.rollNumber
    });

    console.log("newStudent is ",newStudent);

    newStudent.save().then((resp) => {
        console.log(resp);
        res.status(200).send(`you are now registered '<button onclick="location.href=\'/\'">Return to Main Page</button>'`);
    }).catch((err) => {
        res.status(500).send(err);
    })

});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// Route to serve the registration page
app.get('/registration.html', (req, res) => {
  res.sendFile(__dirname + '/registration.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
  
//getting data

  app.get('/get_students', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  