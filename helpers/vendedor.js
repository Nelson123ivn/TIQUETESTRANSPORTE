import Vendedor from "../models/vendedor.js";

const helpersVendedor = {
  existeVendedorById: async (id, req) => {
    const existe = await Vendedor.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }

    req.req.vendedorUpdate = existe;
  },

  existeCedula: async (cedula, req) => {
    if (cedula) {
      const existe = await Vendedor.findOne({ cedula });
      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(
            `Ya existe esa cedula en la base de datos!!! ${cedula}`
          );
        } else if (req.req.method === "POST")
          throw new Error(
            `Ya existe ese cedula en la base de datos!!! ${cedula}`
          );
      }
    }
  },

  existeUsuario: async (usuario, req) => {
    if (usuario) {
      const existe = await Vendedor.findOne({ usuario });
      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(
            `Ya existe ese usuario en la base de datos!!! ${usuario}`
          );
        }else if(req.req.method === "POST")
        throw new Error(
          `Ya existe ese usuario en la base de datos!!! ${usuario}`
        );
      }
    }
  },

  existeTelefono: async (telefono, req) => {
    if (telefono) {
      const existe = await Vendedor.findOne({ telefono });
      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(
            `Ya existe esa telefono en la base de datos!!! ${telefono}`
          );
        }
        throw new Error(
          `Ya existe ese teléfono en la base de datos!!! ${telefono}`
        );
      }
    }
  },

  noInactivarAdmin: async (id) => {
    const idAdmin = "655bac195bb4d4c3c0171460";

    if (id === idAdmin) throw new Error("El admin no puede ser desactivado.");
  },
};
export default helpersVendedor;
