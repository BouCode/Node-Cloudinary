const { Router } = require ('express');
const router = Router ();

const User = require ('../../models/users');
const passport = require ('passport');
//EXPRESS-VALIDATOR
router.get ('/users/signin', (req, res) => {
    //res.render()
    res.json ({ msg: "Ingresando a la app"})
})

router.post ('/users/signin', passport.authenticate ('local', {
    successRedirect : '/notes',
    failureRedirect : '/users/signin',
    failureFlash: true
}))

router.get ('/users/signup', async (req, res) => {
    //res.render()
    // res.json ({ msg: "Formulario de authenticacion"})
    const users = await User.find ();
    res.json (users)
})

router.post ('/users/signup', async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const errors = [];
        
        if ( password != confirm_password) {
            errors.push ({ msg: "Password do not match"});
        }
        if (password.length < 4) {
            errors.push ({ msg : "Password must be at least 4 characters"})
        }
        if (errors.length > 0) {
            //res.render ('users/signup'/, {error, name, email, password...})
        } else {
            const emailUser = await User.findOne ({ email : email });
            if (emailUser) {
               
                //res.redirect signup
                res.json ({ msg: "User exist!"})
            }
            const newUser = new User ({
                name, 
                email,
                password
            })
            newUser.password = await newUser.encryptPassword (password);
            await newUser.save ();
            res.json ({ msg : 'Estas registrado!'})
            //res.redirect signin
        }
    } catch (error) {
        console.error (error);
    }
})

router.get ('/users/logout', (req, res) => {
    req.logout ();
    res.json ({ msg : "salio de sesion"})
    //res.redirect ()
})
module.exports = router;