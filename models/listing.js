const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./review.js")

const listingSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    set:(v) => v === ""? "https://images.unsplash.com/photo-1720884413532-59289875c3e1?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    default: "https://images.unsplash.com/photo-1720884413532-59289875c3e1?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  price:{
    type: Number,
  },
  location:{
    type: String,
  },
  country:{
    type: String,
  },
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    }
  ]
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
})

const Listing  = mongoose.model("Listing", listingSchema);

module.exports = Listing;


