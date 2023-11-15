import mongoose from 'mongoose'
import fs from 'fs';
import path from 'path';
import url from 'url';

// 1ST DRAFT DATA MODEL
const cssClassSchema = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'img' }]
});

const imgSchema = new mongoose.Schema({
    cssClass: { type: String, required: true },
    url: { type: String, required: true }
});

// register models
mongoose.model('cssClass', cssClassSchema);
mongoose.model('Image', imgSchema);

/*
mongodb://wz2111:xCzwRins@class-mongodb.cims.nyu.edu/wz2111
process.env.NODE_ENV
*/
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
  // if we're in PRODUCTION mode, then read the configration from a file
  // use blocking file io to do this...
  const fn = path.join(__dirname, 'config.json');
  const data = fs.readFileSync(fn);

  // our configuration file will be in json, so parse it and set the
  // conenction string appropriately!
  const conf = JSON.parse(data);
  dbconf = conf.dbconf;
  await mongoose.connect(dbconf);
} else {
  // if we're not in PRODUCTION mode, then use
  // dbconf = 'mongodb://localhost/YOUR_DATABASE_NAME_HERE';
  dbconf = 'mongodb://127.0.0.1/wz2111';
  // dbconf = 'mongodb://wz2111:xCzwRins@class-mongodb.cims.nyu.edu/wz2111';
  await mongoose.connect(dbconf);
}

// await mongoose.connect("mongodb://localhost/");
// "dbconf": "mongodb://wz2111:xCzwRins@class-mongodb.cims.nyu.edu/wz2111"
