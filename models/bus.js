import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Bus = new Schema({
  empresa: { type: String, require: true },
  asiento: { type: Number, require: true },
  placa: { type: String, maxlength: 7 },
  createdAt: { type: Date, default: Date.now },
  estado: { type: Number, default: 1 },
  conductor: { type: mongoose.Schema.Types.Objectid, ref: "conductor", require:true },
});

export default mongoose.model("Bu", Bus);
