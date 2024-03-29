import Conductor from "../models/conductor.js";

const httpConductor = {

  //GET
  getAllConductor: async (req, res) => {
    try {
        const conductor = await Conductor.find();
        res.json({ conductor });
    } catch (error) {
        res.status(400).json({ error });
    }
},

getConductorCedula: async (req, res) => {
    try {
        const {cedula} = req.params
        const conductor = await Conductor.find({ cedula });
        // const conductor = await conductor.find({
        //     $and:[
        //         {cedula},
        //         {stado:1}
        //     ]
        // })v
        res.json({ conductor });
    } catch (error) {
        res.status(400).json({ error });
    }
},

getConductorId: async (req, res) => {
    try {
        const { id } = req.params
        const conductor = await Conductor.findById(id)
        
        res.json({ conductor });
    } catch (error) {
        res.status(400).json({ error })

    }
},

//POST
postConductor: async (req, res) => {
    try {
        const { nombre, cedula} = req.body;
        const conductor = new Conductor({ nombre, cedula});
        await conductor.save();

        res.json({ conductor });
    } catch (error) {
        res.status(400).json({ error });
    }
},


//PUT
putConductor: async (req, res) => {
    try {
        const { id } = req.params
        console.log("c", req.body)
        const { nombre, cedula } = req.body

        const conductor = await Conductor.findByIdAndUpdate(id, { nombre, cedula }, { new: true });
        res.json({ conductor })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }

},

putConductorInactivar: async (req, res) => {
    try {
        const { id } = req.params
        const conductor = await Conductor.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ conductor })
    } catch (error) {
        res.status(400).json({ error })

    }
},
putConductorActivar: async (req, res) => {
    try {
        const { id } = req.params
        const conductor = await Conductor.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ conductor })
    } catch (error) {
        res.status(400).json({ error })

    }
},



//DELETE
deleteConductor: async (req, res) => {
    try {
        const { cedula } = req.params
        const conductor = await Conductor.findOneAndDelete({ cedula })
        res.json({ msg:"Eliminado el conductor" })
    } catch (error) {
        res.status(400).json({ error })
    }

},

deleteConductorId: async (req, res) => {
    try {
        const { id } = req.params
        const conductor = await Conductor.findByIdAndDelete(id)
        res.json({ conductor })
    } catch (error) {
        res.status(400).json({ error })
    }
},

deleteAll: async (req, res) => {
    try {
      const conductor = await Conductor.deleteMany({});
      res.json({ msg: 'Se borro todo'});
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
export default httpConductor;
