const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"password",
        database:"test"
    }
)

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/", (req, res)=>{
    res.json("Hello this is the backend");
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books;"
    db.query(q, (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
    
})

app.post("/books", (req, res) =>{
    const q = "INSERT INTO books(`name`, `author`, `genre`) VALUES (?);"
    const values = [req.body.name, req.body.author, req.body.genre,];
    db.query(q, [values],(err, data)=>{
        if (err) return res.json(err)
        return res.json("Book has been created Successfully")
    })

})

app.post("/login", (req, res) =>{
    console.log(req.body.username)
    console.log(req.body.password)
    return res.json("Yessss");

})

app.post("/signup", (req, res) =>{
    console.log(req.body.name)
    console.log(req.body.username)
    console.log(req.body.password)
    console.log(req.body.passwordConfirm)
    

    const {name, email, password, passwordConfirm} = req.body;

    const q = "SELECT EMAIL FROM USERS WHERE EMAIL = ?"
    db.query(q, [email], (err, data)=>{
        if (err) return res.json(err)
        else if(password != password){
            return res.json("Passwords do not match");
        }
        return res.json("Book has been created Successfully")
    })

    return res.json("Yessss Again");

})

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM BOOKS WHERE id = ?"
    db.query(q, [bookId],(err, data)=>{
        if (err) return res.json(err)
        return res.json("Book has been deleted Successfully")
    })

})

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE BOOKS SET `name` = ?, `author` = ?, `genre` = ? WHERE id = ?"
    const values = [
        req.body.name,
        req.body.author, 
        req.body.genre,
    ]
    db.query(q, [...values, bookId],(err, data)=>{
        if (err) return res.json(err)
        return res.json("Book has been Updated Successfully")
    })

})

app.get("/books/:id", (req, res)=>{
    const bookId = req.params.id
    const q = "SELECT * FROM books where id = ?;"
    db.query(q, [bookId], (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(3001, ()=>{
    console.log("Connected to Backend!")
})