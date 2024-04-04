const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const accesoriosMascotas = [
  {
    id: 0,
    nombre: "Collar ajustable",
    precio: 15.99,
    descripcion: "Collar de nylon ajustable para perros y gatos.",
  },
  {
    id: 1,
    nombre: "Juguete masticable",
    precio: 9.49,
    descripcion: "Juguete masticable resistente para perros de tamaño mediano.",
  },
  {
    id: 2,
    nombre: "Cama suave para gatos",
    precio: 24.99,
    descripcion: "Cama suave y acogedora para gatos, lavable a máquina.",
  },
  {
    id: 3,
    nombre: "Bebedero automático",
    precio: 19.99,
    descripcion:
      "Bebedero automático con capacidad de 2 litros para perros y gatos.",
  },
  {
    id: 4,
    nombre: "Rascador de sisal",
    precio: 29.99,
    descripcion:
      "Rascador de sisal resistente para gatos, con poste de altura ajustable.",
  },
];

const usuarios = [
  { nombre: "Susana", contra: "cualquiera" },
  { nombre: "Sara", contra: "$ara123" },
  { nombre: 'Jesus', contra: 'Mortadelo'},
  { nombre: 'Noemi', contra: 'FilemonPi.'}
];


app.post('/', (req,res)=>{

    let nombre = req.body.nombre;
    let contra = req.body.contra;
    let login = false;

    usuarios.forEach((usuario)=>{

      if (usuario.nombre == nombre && usuario.contra == contra) {

        login = true;

      }

    })

    if (login) {
      
      res.json({state:'success'});

    }else{

      res.json({state:'failed'});
      
    }

})


app.get('/productos',(req,res)=>{

  let arrayAuxiliar = accesoriosMascotas.map((accesorio=>{
    return {
      id: accesorio.id,
      nombre:accesorio.nombre
    }
  }));

  res.json({productos:arrayAuxiliar})

})

app.get('/productos/detalleProducto',(req,res)=>{

  let id = req.query.id;

  res.json(accesoriosMascotas[id]);

})

app.post('/productos/nuevoProducto',(req,res)=>{

  let nombre = req.body.nombre;
  let precio = req.body.precio;
  let descripcion = req.body.descripcion;
  let id = accesoriosMascotas.length;

  let objeto = {
    id:id,
    nombre:nombre,
    precio:parseInt(precio),
    descripcion:descripcion
    
  }

  accesoriosMascotas.push(objeto);

  res.redirect('http://localhost:5173/');

})

app.listen(3000,()=>{
    console.log('Servidor Encendido');
})