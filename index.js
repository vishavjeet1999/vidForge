import express from 'express'
import  videoshow from 'videoshow'

const app = express()
const port = 3000
app.use("/video", async (req, res) => {

    var secondsToShowEachImage = 1
    var finalVideoPath = './test2.mp4'

    // setup videoshow options
    var videoOptions = {
        fps: 24,
        transition: false,
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x640',
        outputOptions: ['-pix_fmt yuv420p'],
        format: 'mp4'
    }

    // array of images to make the 'videoshow' from
    var images = [
        { path: './group.png', loop: 5 },
        { path: './group.png', loop: 5 },
    ]

    videoshow(images, videoOptions)
        .save(finalVideoPath)
        .on('start', function (command) {
            console.log('encoding ' + finalVideoPath + ' with command ' + command)
        })
        .on('error', function (err, stdout, stderr) {
            return Promise.reject(new Error(err))
        })
        .on('end', function (output) {
            // do stuff here when done
        })

    res.json(req.query)
})

app.use("/", (req, res) => {
    res.json({
        message: "hello"
    })
})


app.listen(port, () => { console.log(`Server running on port ${port}`) })