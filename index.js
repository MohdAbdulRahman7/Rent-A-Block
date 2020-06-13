const mysql = require('mysql');
const express = require('express');
var multer = require('multer');

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database: 'renter',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeed');
    else
    console.log('DB connection failed \n Error : '+ JSON.stringify(err,undefined, 2) );
});

app.listen(3000,()=>console.log('Express Server runs at port no:3000'));


//module.exports = router;

// Insert RC image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
  
   var upload = multer({ storage: storage }).single('rcImage')


app.post('/rcImage', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    }
    res.json({
       success:true,
       message:'ImageUploaded' 
    });

    // Everything went fine.
  })
});









// Insert license image
var s = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
  
   var u = multer({ storage: s }).single('licImage')

app.post('/licenseImage', function (req, res) {
  u(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    }
    res.json({
       success:true,
       message:'ImageUploaded' 
    });

    // Everything went fine.
  })
});






//Get all renters
app.get('/renter',(req,res)=>{
    mysqlConnection.query('SELECT * FROM rent',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Get a renter

app.get('/renter/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM rent WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Delete a renter

app.delete('/delete_renter/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM rent WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err);
    })
});


//Insert a renter

app.post('/insert_renter',(req,res)=>{
    let re = req.body;
    var sql = "SET @id = ?;SET @user_id = ?;SET @vehicle_rc = ?;SET @user_licence = ?;SET @rc_img = ?;SET @lic_img = ?;\
    CALL RenterAddOrEdit(@id,@user_id,@vehicle_rc,@user_licence,@rc_img,@lic_img);";
    mysqlConnection.query(sql,[re.id, re.user_id, re.vehicle_rc, re.user_licence, re.rc_img, re.lic_img],(err, rows, fields)=>{
        if(!err)
        rows.forEach(element => {

            if(element.constructor == Array)
            res.send('Inserted ID:'+element[0].id);
            
        });
        else
        console.log(err);
    })
});

//Update a renter

app.put('/update_renter',(req,res)=>{
    let re = req.body;
    var sql = "SET @id = ?;SET @user_id = ?;SET @vehicle_rc = ?;SET @user_licence = ?;SET @rc_img = ?;SET @lic_img = ?;\
    CALL RenterAddOrEdit(@id,@user_id,@vehicle_rc,@user_licence,@rc_img,@lic_img);";
    mysqlConnection.query(sql,[re.id, re.user_id, re.vehicle_rc, re.user_licence, re.rc_img, re.lic_img],(err, rows, fields)=>{
        if(!err)
        res.send('Updated Succesfully');
        else
        console.log(err);
    })
});