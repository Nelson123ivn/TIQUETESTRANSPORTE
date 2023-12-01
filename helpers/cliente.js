import { parse } from "dotenv";
import Cliente from "../models/cliente.js";

const helpersCliente = {
  existeClienteById: async (id, req) => {
    const existe = await Cliente.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }

    req.req.clienteUpdate = existe;
  },

  existeCedula: async (cedula, req) => {
    console.log("x", cedula);
    if (cedula) {
      const existe = await Cliente.findOne({ cedula });

      console.log("e", existe);
      // console.log(req.req);
      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(
            `Ya existe esa cedula en la base de datos!!! ${cedula}`
          );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe ese cedula en la base de datos!!!`);
      }
    }
  },

  existeEmail: async (email, req) => {
    console.log("a", email);

    const existe = await Cliente.findOne({ email });
    if (existe) {
      

      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        console.log("h");
        throw new Error(`Ya existe ese email en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        console.log("h2");

        throw new Error(`Ya existe ese email en la base de datos!!! `);
      }
    }
  },

  validarEmail: async (email) => {
    console.log("z");
    console.log(email);
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      throw new Error("Email no válido. Ejemplo: usuario@example.com");
    }
  },
};
export default helpersCliente;
