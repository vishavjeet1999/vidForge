import express from 'express'
import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const app = express()
const port = 3000


app.use(express.static('public'));


app.use("/screenshot", async (req, res) => {
    const filePath = path.join(process.cwd(), 'public', 'output', `screenshot.png`);

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto("https://www.webpagetest.org/", { timeout: 0 });
    // await page.screenshot({ path: filePath });
    // await browser.close();
    // res.sendFile(filePath)
    const executablePath = await edgeChromium.executablePath

    const browser = await puppeteer.launch({
        executablePath,
        args: edgeChromium.args,
        headless: false,
    })

    const page = await browser.newPage()
    await page.goto('https://github.com')

    res.send('hello')
})

app.use("/", async (req, res) => {
    res.json({
        message: "hello"
    })
})


app.listen(port, () => { console.log(`Server running on port ${port}`) })