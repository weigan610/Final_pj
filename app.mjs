// app.mjs
import './db.mjs';
import express from 'express';
import path from 'path';
import url from 'url';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
// import session from 'express-session';

const app = express();
// Body Parsing Middleware
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'hbs');

// Static file Middleware
const basePath = path.dirname(url.fileURLToPath(import.meta.url));
const publicPath = path.resolve(basePath, "public");
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('urlAsk');
});

const Image = mongoose.model('Image');
app.get('/api/favouriteLinks', async (req, res) => {
    const q = {};
    const images = await Image.find(q).exec();
    res.json(images.map(img => {
        return {cssClass: img.cssClass, url: img.url};
    }));
});

app.post('/api/favouriteLinks', async (req, res) => {
    const requestURL = req.body.URL;
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(requestURL);
    // const html = await page.content();
    const cssClasses = await page.evaluate(() => Array.from(document.querySelectorAll('img'), img => img.className));
    cssClasses.filter(ele => (ele));
    browser.close();
    // for an api, send back json response. 
    const img = new Image({
        cssClass: cssClasses[0],
        url: req.body.URL
    });

    try {
        const savedImage = await img.save();
        res.json({status: 'success', savedImage});
    }
    catch(e) {
        res.json({status: 'error', savedImage: null});
    }
});

app.get('/result', async (req, res) => {
    const requestURL = req.query.URL;
    if (! requestURL) {
        res.render('urlAsk');
    }
    else {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        // const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(requestURL);
        // const html = await page.content();
        const images = await page.evaluate(() => Array.from(document.querySelectorAll('img'), img => img.src));
        browser.close();
        res.render('result', {requestURL: req.query.URL, images: images});
        // res.render('result', {requestURL: req.query.URL});
    }
});

console.log(process.env.PORT);
app.listen(process.env.PORT || 3000);


