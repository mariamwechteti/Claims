const Image = require('../models/images.model.js');
var fs = require('fs');
post=require('../models/new.model').Post;

 exports.uploadimg = (req, res) => {
   console.log(req.file);
   if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received successfully');
    var image=new Image();
    
    image.img.data=new Buffer(fs.readFileSync(req.file.path).toString("base64"));
    image.img.contentType=req.file.mimetype;
    image.save();
    return res.send({
message:'New image added to the db !' 
   })
  
}
/*exports.findAll = (req, res) => {
    Image.find().toArray()
    .then(images => {
      const imgArray=images.map(element => element._id);
            console.log(imgArray);
        res.send(images);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

          
  /* const image = new Image({
    
    data: req.file.path
});
image.save(function(err,data){
  if(err) throw err
res.send(data)
});
 var filesArray = req.files;
        async.each(filesArray,function(file,eachcallback){
         //carry out your file operations here and pass callback at the end  
         
         const image = new Image({
    
        data:req.file.path
    });
    image.save(function(err,data){
      if(err) throw err
console.log(data)
  });
         },function(err){
          if(err){
              console.log("error ocurred in each",err);
          }
          else{
            console.log("finished prcessing");
            
            res.send({
                      "code":"200",
                      "success":"files printed successfully"
                      })
          //  cmd.run('rm -rf ./fileupload/*');
          }
          });*/

 };
exports.delete=()=>
{
  Image.dropCollection(function (err) {

    if (err) {

        console.log("error delete collection");

    } else {

        console.log("delete collection success");

    }

});
}