import express from 'express'

const app = express()
const port = 3000

app.use("/", (req, res)=>{
    res.json({
        message: "hello"
    })
})

app.listen(port, ()=> { console.log(`Server running on port ${port}`) })