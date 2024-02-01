import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { newUser} from './server/script.mjs';
import viewsRouter from './server/views.mjs';
import connection from './server/db/db.mjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import flash from 'express-flash';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
// Derive the directory path from the file path
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'build', 'public')));
// Configurar una ruta estática para los archivos JavaScript en src/js
app.use('/scripts', express.static(path.join(__dirname, 'build', 'src', 'js')));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'build', 'src', 'views'));

// Configurar express-session
app.use(session({
  secret: 'tu_secreto',
  resave: false,  
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('', viewsRouter);

passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"},
  async function(username, password, done) {
    console.log(username);
    try {
      const [user] = await connection.query('SELECT * FROM cliente WHERE Correo = ? AND contrasenia = ?', [username, password]);
      console.log("Hola");
      if (!user.length) {
        // Usuario no encontrado en la base de datos
        console.log('Cliente no encontrado');
        //res.status(404);
        return done(null, false, { message: 'Cliente no encontrado' });
      }

      const dbPassword = user[0].contrasenia;

      if (password !== dbPassword) {
        // Contrasenia incorrecta
        console.log("contraseña incorrecta");
        return done(null, false, { message: 'Contrasenia incorrecta' });
      }

      // Autenticación exitosa, pasa al siguiente middleware
      console.log("entro", user[0], 'aa');
      return done(null, user[0]);
    } catch (error) {
      console.log("error");
      return done(error);
    }
  }
));

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.correo);
});

passport.deserializeUser(async function(Correo, done) {
  try {
    const [user] = await connection.query('SELECT * FROM cliente WHERE Correo = ?', [Correo]);

    if (!user || user.length === 0) {
      // Si no se encuentra un Usuario, puedes manejar el caso aquí
      return done(null, false);
    }

    // Si se encuentra un Usuario válido, lo pasas como resultado al próximo middleware
    return done(null, user[0]);
  } catch (error) {
    console.error("Error:", error);
    return done(error);
  }
});

app.post('/Login', passport.authenticate('local', {
  successRedirect: '/configuracion',
  failureRedirect: '/',
  failureFlash: true
}));

app.post('/', async (req, res) => {
  const { nombre, apellido, Correo, contrasenia, telefono, fechaNacimiento } = req.body;

  try {
    // Consulta si el Correo electrónico ya existe en la base de datos
    const [existingUser] = await connection.query('SELECT * FROM cliente WHERE Correo = ?', [Correo]);

    if (existingUser.length > 0) {
      // Si el Correo ya existe, envía una respuesta de error
      return res.status(409).json({ error: 'El Correo ya está registrado. Utiliza otro Correo.' });
    }

    // Si el Correo no existe, procede con el registro
    const response = await newUser(nombre, apellido, Correo, contrasenia, telefono, fechaNacimiento);
    const respuesta = {
      datosRecibidos: {
        nombre, apellido, Correo, contrasenia, telefono, fechaNacimiento
      }
    };
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);

    // Manejo de otros errores
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'El Correo ya está registrado. Utiliza otro Correo.' });
    } else {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
});



app.post('/contacto', async (req, res) => {
  const { nombre, email, telefono, msj} = req.body;

  try {
    // Iniciar la transacción
    await connection.beginTransaction();
  
    // Guardar los datos del formulario en la tabla "prospecto"
      const insertContactoResult = await connection.query(
        'INSERT INTO contacto (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)',
        [nombre, email, telefono, msj]
      );  
    
  
    await connection.commit();
    res.status(200).json({ message: 'Se ha enviado el mensaje correctamente' });
    
  } catch (error) {
    console.error('Error:', error);
    await connection.rollback();
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });