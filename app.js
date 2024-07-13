const express = require("express");
const app = express();
// const port = 3000;
const path = require("path");
const dotenv = require("dotenv");
const hbs = require("hbs");
const uploadRouter = require("./routes/uploadRoutes");//Importa router de upload


//Cargar variable de entorno
dotenv.config();
const PORT = process.env.PORT || 3000;

//Middleware para servir contenido estatico desde la carpeta public
app.use(express.static(path.join(__dirname,"public")));

//Configuración HandLebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Registrar parciales
hbs.registerPartials(path.join(__dirname, "views", "partials"));



//Configuración de rutas
app.use("/upload",uploadRouter );


//Rutas principales
app.get('/', function (req, res) {
  res.render("index", {
    layout: "layouts/main",
    title: "Inicio",
    message: "Bienvenidos a nuestra aplicación de express y handlebars",

  });
});



app.get("/acerca", function(req, res)  {
  res.render("acerca", {
    layout: "layouts/main",
    tiltle: "Acerca de nosotros",
    message: "Información sobre nuestro proyecto",
  });
});

app.get("/contacto", function(req, res) {
  res.render("contacto",{
    layout: "layouts/main",
    tiltle: "Contacto",
    message: "Página de contacto",
    message: "Bienvenidods  nuestra aplicación de carga de archivos ",
  });
});

app.get('/usuarios', function(req, res) {
const usuarios = [
  {nombre: "Cosme Fulano", email: "cosme@gmail.com"},
  {nombre: "Cosmecito Fulanito", email: "fulanito@gmail.com"}
]
res.render("usuarios", {usuarios});

});

app.post('/enviar-formulario', function(req, res) {
  res.send('Formulario enviado');
});

app.put('/actualizar.datos', function(req, res) {
  res.send('Datos actualizados');
});

app.delete('/eliminar-datos', function(req, res) {
  res.send('Datos eliminados');
});

app.get("/personajes", async(req, res) =>{
  try{
    const response = await axios.get("https://hp-api.herokuapp.com/api/characters")   
   const characters = response.data;
    res.render("personajes", { characters});
  } catch(error){
      console.error("Error al obtener personajes", error);
      res.status(500).send("Error al obtener personajes");
    }
    

    })

    app.get("/personajes/casa/:house", async (req, res) => {
      const house = req.params.house;//Obtener el parámetro "house de la consulta"
      try{
        
        const response = await axios.get(`https://hp-api.herokuapp.com/api/characters/house/${house}`);   
        const characters = response.data;
        //renderiza la vista correspondiente según filtro por casa

       if(house){
          res.render("personajes-casa", { characters, house });
      } else{
        res.render("personajes", { characters });
      }

      } catch(error){
          console.error("Error al obtener personajes", error);
          res.status(500).send("Error al obtener personajes");
        }
    
        });

        //manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('error404', { title: 'pagina no encontrada'});
})


//Iniciar servidor

app.listen(PORT, () =>{
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});