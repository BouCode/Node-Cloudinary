const { Router } = require ('express');
const router = Router ();

const Note = require ('../../models/note');
const { isAuthenticated } = require ('../../helpers/auth');

router.get ('/notes/add', isAuthenticated, (req, res) => {
    //res.render()
    res.json ({ msg: "renderizado"})
})

router.post ('/notes/new-note',isAuthenticated,  async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push ({ text : "Please Write a title"});
    }
    if (!description) {
        errors.push ({text : "Please write a description"});
    }
    if (errors.length > 0) {
        res.json ({ msg: 'Reinicie los campos'})
        // res.render ('/notes/new-note', {
        //     errors,
        //     title,
        //     description
        // })

    } else {
        const newNote = new Note ({ 
            title, 
            description
        });
        newNote.user = req.user.id;
        await newNote.save ();
        //res.redirect ()
        console.log (newNote);
    }
    res.json ({ msg: "ok"});
})

router.get ('/notes/edit/:id',isAuthenticated, async (req, res) => {
    const note = await Note.findById (req.params.id);
    //res.render ();
})

router.put ('/notes/edit-note/:id',isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate (req.params.id, {
        title, 
        description
    })
    res.json ({ msg : "modificado"});
    //res.redirect ();
})

router.delete ('/notes/delete/:id' ,isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete (req.params.id);
    res.json ({ msg: "borrado"});
    //res.redirect ()
})
router.get ('/notes',isAuthenticated, async (req, res) => {
    //res.render()
    // res.json ({ msg : "Notas en el db"})
    const notes = await Note.find ({user: req.user.id});
    res.json (notes);
})

module.exports = router;