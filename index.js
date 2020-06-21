const express = require('express')
const path = require('path');
const { Pool } = require('pg');
const { render } = require('ejs');
const PORT = process.env.PORT || 5000
var pool;
pool = new Pool({
  connectionString: 'postgres://postgres:Ianmicro32@localhost/users'
})

// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })
// ;
// postgresql-rigid-22557

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
  // .get('/db', async (req, res) => {
  //   try {
  //     const client = await pool.connect();
  //     const result = await client.query('SELECT * FROM test_table');
  //     const results = { 'results': (result) ? result.rows : null};
  //     res.render('pages/db', results );
  //     client.release();
  //   } catch (err) {
  //     console.error(err);
  //     res.send("Error " + err);
  //   }
  // })
app.get('/database', (req,res)=>{

  // var data = {results: [2,3,4,5,6]};
  // res.render('pages/db',data)
  // var data = {results: [2,3,4,5,6]};
  var getUsersQuery = `SELECT * FROM Person`;
  pool.query(getUsersQuery, (error, results) =>{
    if (error)
      res.end(error);
    var results = {'rows':results.rows}
    res.render('pages/viewData',results);
  }
  
  )

  
})
app.get('/editData',(req,res)=>{
  var getPersonQuery = `SELECT * FROM Person`;
  pool.query(getPersonQuery, (error, results) =>{
    if (error)
      res.end(error);
    
    var results = {'rows': results.rows}
    res.render('pages/editData',results)
  })
  
})
app.post('/deletePerson',(req,res)=>{
  var id = req.body.idToDelete;
  console.log(id);

  var deletePerson = `DELETE FROM Person Where uid=${id}`;
  pool.query(deletePerson, (error, results)=>{
    if(error){
      res.end(error);
      console.log("DELETE ERROR");
      console.log(deletePerson);
    }
    else
     console.log("User Succesfully deleted");
  })
  res.redirect('/editData');
}

)

app.post('/updatePerson',(req,res)=>{

  var uid = req.body.id;
  var fname = req.body.fName;
  var lname = req.body.lName;
  var weight = req.body.weight;
  var height = req.body.height;
  var colour = req.body.colour;
  var pet = req.body.pet;
  var position = req.body.position;
  var age = req.body.age;


  if(fname != "" && fname !== undefined)
  {
    var update = `UPDATE person SET fname='${fname}' WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for first name")
      }
    } 
    )
  }
  if(lname != "" && lname !== undefined)
  {
    var update = `UPDATE person SET lname='${lname}' WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for last name")
      }
    } 
    )
  }
  if(weight != "" && weight !== undefined)
  {
    var update = `UPDATE person SET weight=${weight} WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for weight")
      }
    } 
    )
  }
  if(age != "" && age !== undefined)
  {
    var update = `UPDATE person SET age=${age} WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for age")
      }
    } 
    )
  }
  if(height != "" && height !== undefined)
  {
    var update = `UPDATE person SET height=${height} WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for Height")
      }
    } 
    )
  }
  if(colour != "" && colour !== undefined)
  {
    var update = `UPDATE person SET colour='${colour}' WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for Colour")
      }
    } 
    )
  }
  if(pet != "" && pet !== undefined)
  {
    console.log(`This is the value of pet: ${pet}`);
    var update = `UPDATE person SET pet='${pet}' WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for Pet")
      }
    } 
    )
  }
  if(position != "" && position !== undefined)
  {
    var update = `UPDATE person SET position='${position}' WHERE uid=${uid}`;
    pool.query(update,(error,results) =>{
      if(error){
        res.end(error);
        console.log("UPDATE ERROR for Position")
      }
    } 
    )
  }
  
  
  
  res.redirect('/editData');

})

app.post('/addPerson',(req,res)=>{

  var uid = req.body.id;
  var fname = req.body.fName;
  var lname = req.body.lName;
  var weight = req.body.weight;
  var height = req.body.height;
  var colour = req.body.colour;
  var pet = req.body.pet;
  var position = req.body.position;
  var age = req.body.age;

  var addPerson = `INSERT INTO Person VALUES (${uid},${age},'${fname}','${lname}',
    ${height},${weight},'${colour}','${pet}','${position}')`;

  pool.query(addPerson, (error,results)=>{

    if(error)
    {
      console.log("ERROR Adding someone");
    }
  })
  res.redirect('/editData');

}


)


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

