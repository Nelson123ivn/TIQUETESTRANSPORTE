import Conductor from "../models/conductor.js"


const helpersConductor = {

    existeCedula: async (cedula, req) => {
        if (cedula) {
            const existe = await Conductor.findOne({ cedula })
            if (existe) {
                if (req.req.method === "PUT") {
                    throw new Error(`Ya existe esa cedula en la base de datos!!! ${cedula}`)
                }
                throw new Error(
                    `Ya existe ese cedula en la base de datos!!! ${email}`
                  );
            }
        }
    }

}
export default helpersConductor