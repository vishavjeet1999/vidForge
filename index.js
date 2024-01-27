import express from 'express'
import editily from 'editly'

const app = express()
const port = 3000
app.use("/video", async(req, res)=>{
    await editily({
        width:900,
        height: 1600,
        outPath: "./test.mp4",
        clips:[
            {
                duration: 10,
                layers:[
                    // {
                    //     type: 'image',
                    //     path: './group.png'
                    // },
                    {
                        type:"news-title",
                        text:"text 1"
                    },
                    {
                        type:"subtitle",
                        text: "text 2"
                    }
                ]
            }
        ]
    }).catch(e=> console.log(e))

    res.json(req.query)
})

app.use("/", (req, res)=>{
    res.json({
        message: "hello"
    })
})


app.listen(port, ()=> { console.log(`Server running on port ${port}`) })