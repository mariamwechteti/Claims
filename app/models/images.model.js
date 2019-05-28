const mongoose = require('mongoose');
 
/*const ImageSchema = mongoose.Schema({
  img:Buffer },{
timestamps: true  
  })*/
 
//module.exports = mongoose.model('Image', ImageSchema);
var Schema = mongoose.Schema;
var ImgSchema = new Schema({
    img: { data: Buffer, contentType: String}
}, {
    timestamps: true
});
module.exports = mongoose.model('Img', ImgSchema);