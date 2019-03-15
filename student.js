let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]

app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [{'id':5635512001,'name':'pluk','surname': 'Phuaphan','major': 'COE','GPA': 3.32},
   {'id':5635512002,'name':'Jay','surname': 'Jeama','major': 'SE','GPA': 3}
];
//let studentIndex=2;

router.route('/students')
   // get all student
   .get( (req, res) =>  res.json(students) ) 
   // insert a new bear
   .post( (req, res)=> {
       var student = {};
       student.id =  req.body.id
       student.name = req.body.name
       student.surname = req.body.surname
       student.major = req.body.major
       student.GPA = req.body.GPA
       students.push(student);
       res.json( {message: 'student created!'} )
   })
router.route('/students/:student_id')
   .get ( (req,res) => res.json(students[req.params.student_id]))  // get a bear

   .put ( (req,res) => {                               // Update a bear
       var id = req.params.student_id
       students[id].id = req.body.id  
       students[id].name  = req.body.name 
       students[id].surname  = req.body.surname  
       students[id].major = req.body.major
       students[id].GPA = req.body.GPA
       res.json({ message: 'student updated!' + req.params.student_id});
   })

   .delete ( (req,res) => {                   // Delete a bear
       delete     students[req.params.student_id]
       res.json({ message: 'student deleted: ' + req.params.student_id});
   })
//router.route('/bears').get((req, res) =>  res.CRUD(bears) );
router.route('/students').get((req, res) =>  res.json(students) );

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(8000,  () => console.log("Server is running") );