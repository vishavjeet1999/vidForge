// import fs from 'fs'
// import { createCanvas, loadImage } from 'canvas'

// const width = 1200
// const height = 630

// const canvas = createCanvas(width, height)
// const context = canvas.getContext('2d')

// context.fillStyle = '#000'
// context.fillRect(0, 0, width, height)

// context.font = 'bold 70pt Menlo'
// context.textAlign = 'center'
// context.textBaseline = 'top'
// context.fillStyle = '#3574d4'

// const text = 'Hello, World!'

// const textWidth = context.measureText(text).width
// context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
// context.fillStyle = '#fff'
// context.fillText(text, 600, 170)

// context.fillStyle = '#fff'
// context.font = 'bold 30pt Menlo'
// context.fillText('flaviocopes.com', 600, 530)

// loadImage('./logo.png').then(image => {
//   context.drawImage(image, 340, 515, 70, 70)
//   const buffer = canvas.toBuffer('image/png')
//   fs.writeFileSync('./test.png', buffer)
// })


import express from 'express';
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

const app = express();
const port = 3000;

app.get('/image', async (req, res) => {
  try {
    const width = 1200;
    const height = 630;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = '#000'
context.fillRect(0, 0, width, height)

context.font = 'bold 70pt Menlo'
context.textAlign = 'center'
context.textBaseline = 'top'
context.fillStyle = '#3574d4'

const text = 'Hello, World!'

const textWidth = context.measureText(text).width
context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
context.fillStyle = '#fff'
context.fillText(text, 600, 170)

context.fillStyle = '#fff'
context.font = 'bold 30pt Menlo'
context.fillText('flaviocopes.com', 600, 530)

    // Your existing canvas drawing code (without function declarations)

    const buffer = await loadImage('./logo.png').then(image => {
      context.drawImage(image, 340, 515, 70, 70);
      return canvas.toBuffer('image/png');
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
