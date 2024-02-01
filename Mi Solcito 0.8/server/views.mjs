import express from 'express';
import { obtenerProductosCatalogo, obtenerTipoProducto } from './script.mjs';
const router = express.Router();

router.use('/', (req, res, next) => {
  try {
    obtenerTipoProducto((error, resultsTipoProducto) => {
      if (error) {
        console.error('Error al obtener los productos: ' + error);
        res.status(500).send('Error interno del servidor');
        next()
      } else {
        res.locals.resultsTipoProducto = resultsTipoProducto;
        //console.log(res.locals.resultsTipoProducto);
        next()
      }
    });
  } catch (error) {
    console.error('Error al obtener Empleado:', error);
    res.status(500).send('Error interno del servidor');
    next()
  }
})

router.get('/', async (req, res) => {
  res.render("index", { pageTitle: 'Mi Solcito'});
});

router.get('/catalogo', (req, res) => {
  try {
    obtenerProductosCatalogo((error, resultsProductosCatalogo) => {
      if (error) {
        console.error('Error al obtener los tipos de productos: ' + error);
        res.status(500).send('Error interno del servidor');
        //console.log(resultsProductosCatalogo);
        //res.redirect('/'); // Maneja el error redirigiendo a una página de error o realizando otra acción adecuada
      } else {
        //console.log(resultsProductosCatalogo);
        res.render("pages/catalogo", { pageTitle: 'Mi Solcito', resultsProductosCatalogo});
      }
    });
  } catch (error) {
    console.error('Error al obtener Empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
  
});

router.get('/registro', (req, res) => {
  //   const Usuario = req.user;
  //  res.render('/pages/registro',{ pageTitle: 'Registro', Usuario});
    res.render('pages/registro',{ pageTitle: 'Registro'});
})

router.get('/configuracion',(req, res) => {
  if(req.isAuthenticated()){
    res.render('pages/configCliente',{pageTitle: 'Configuración'});
  }else{
    console.log('Accceso no autorizado');
  }
})
  
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error(err);
    }
    
    // Verificar si el Usuario está en la ruta raíz ("/")
    if (req.path === '/') {
      req.isAuthenticated() == false;
      console.log("Desautenticado");
    }
    
    res.redirect('/'); // Redirige al Usuario a la página de inicio u otra página después de cerrar la sesión.
  });
});

export default router;