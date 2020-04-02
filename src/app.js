const express = require ('express');
const morgan = require ('morgan');
const multer = require ('multer');
const path = require ('path');
const methodOverride = require ('method-override');
const session = require ('express-session');
const passport = require ('passport');
//const flash = require ('connect-flash');

//Inicializando 
const app = express ();
require ('./database');
require ('./config/passport');
//Settings
app.set ('port', process.env.PORT || 3000);

//Middlewares
app.use (morgan ('dev'));

app.use (express.json());

app.use (express.urlencoded ({ extended: false }));
        //Configuracion basica para autenticar al usuario
app.use (methodOverride('_method'));
app.use (session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

app.use (passport.initialize());
app.use (passport.session());

    //flash 

const storage = multer.diskStorage ({
    destination: path.join (__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use (multer({storage}).single ('image'));

//Routes
app.use (require ('./routes/index'));
app.use (require ('./routes/registro/notes'));
app.use (require ('./routes/registro/users'));

module.exports = app;