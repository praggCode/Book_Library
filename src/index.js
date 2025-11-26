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
    const existingName = await prisma.genre.findFirst({
        where : {name : name}
    })
    if (existingName) {
        res.status(400).json({error : "this genre is exist"});
    }
    const newGenre = await prisma.genre.create({
        data : {name}
    })
    res.status(201).json(newGenre)
});

app.get("/api/v1/genres", async(req,res) => {
    const genres = await prisma.genre.findMany()
    res.status(200).json(genres)
})

app.get("/api/v1/genres/:id",async (req,res) => {
    const {id} = req.params
    const genreById = await prisma.genre.findUnique({
        where : {id : Number(id)}
    })
    res.status(200).json(genreById)
})

app.patch("/api/v1/genres/:id", async(req,res) => {
    const {id} = req.params
    const {name} = req.body
    const updateGenre = await prisma.genre.update({
        where : {id: Number(id)},
        data : {name}
    })
    res.status(200).json(updateGenre)
})

app.delete("/api/v1/genres/:id", async(req,res) => {
    const {id} = req.params
    const deleteGenre = await prisma.genre.delete({
        where : {id : Number(id)}
    })
    res.status(204).json("deleted geners sucessfully")
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