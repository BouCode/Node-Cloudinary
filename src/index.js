if (process.env.NODE_ENV !== 'production') {
    require ('dotenv').config ();
}

const app = require ('./app');

app.listen (app.get ('port'), () => {
    console.log (`http://localhost:${app.get ('port')}`)
    console.log (`Envionment: ${process.env.NODE_ENV}`)
})