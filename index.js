import express from 'express'
import videoshow from 'videoshow'
import path from 'path'
import nodeHtmlToImage from 'node-html-to-image'
import puppeteer from 'puppeteer'
import chromium from 'chrome-aws-lambda';

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
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage();
    await page.goto("https://www.webpagetest.org/", { timeout: 0 });
    await page.screenshot({ path: filePath });
    await browser.close();
    res.sendFile(filePath)
})

app.use("/", async (req, res) => {
    res.json({
        message: "hello"
    })
})


app.listen(port, () => { console.log(`Server running on port ${port}`) })