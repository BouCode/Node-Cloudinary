const { Router } = require ('express');
const router =  Router (); 

const Photo = require ('../models/photo');
const cloudinary = require ('cloudinary');
cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}); 

const fs = require ('fs-extra');

router.get ('/', async (req, res) => {
    const photo = await Photo.find ();
    // await fs.unlink (req.file.path);
    console.log (photo);
    res.json (photo)
    //res.render ('Todas las imagenes subidas');
});

router.get ('/images/add', async (req, res) => {
    const photo = await Photo.find ();

    // res.render ('Archivo que queremos renderizar');
})

router.post ('/images/add', async (req, res) => {

    try {
      const { title, description} = req.body;
    console.log (req.file);
    const result = await cloudinary.v2.uploader.upload (req.file.path);
    
    console.log (result);

    const newPhoto = new Photo ({
        title,
        description,
        imageURL: result.url,
        pubic_id: result.pubic_id
    })
    await newPhoto.save();
    await fs.unlink (req.file.path);
    res.send ('Received');
    //res.redirect ('/images/add)
    } catch (err) {
        console.error (err)
    }
})

router.get ('/images/add/:photo_id', async (req, res) => {
    
    try {
    const { photo_id } = req.params;
    const photo = await Photo.findByIdAndDelete (photo_id);
    const result = await cloudinary.v2.uploader.destroy (photo.public_id)
    console.log (result);
    res.json ('borrado')
    //res.redirect ('direccion')
    } catch (err) {
        console.error (err)
    }
})
module.exports =  router;

