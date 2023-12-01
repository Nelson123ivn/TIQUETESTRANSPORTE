import Conductor from "../models/conductor.js";

const helpersConductor = {
  existeCedula: async (cedula, req) => {
    if (cedula) {
      const existe = await Conductor.findOne({ cedula });
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
};
export default helpersConductor;
