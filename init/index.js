const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then((res) => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}

const initDB = async() => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=> ({...obj, owner:"670e9b8cff3f2d9288c101b8"}))
  await Listing.insertMany(initData.data);
  console.log("Data is initialized");
}
initDB();

