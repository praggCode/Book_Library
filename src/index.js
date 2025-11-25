const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json())

app.get('/isRunning',(req,res) => {
    res.send("server is running")
})

app.post("/api/v1/genres", async (req,res) => {
    const { name } = req.body;
    const newGenre = await prisma.genre.create({
        data : {name}
    })
    res.status(201).json(newGenre)
});

app.post("/api/v1/authors", async (req,res) => {
    const {name, dob} = req.body;
    const newAuthor = await prisma.author.create({
      data: { name: name, DOB: new Date(dob) },
    });
    res.status(201).json(newAuthor)
})



app.listen(3005,() => {
    console.log("Server is running on port 3005")
})