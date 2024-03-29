import { Router } from "express";
import httpConductor from "../controllers/conductor.js";
import { check } from "express-validator";
import {validationResult} from "express-validator"
import { mongo } from "mongoose";
import { validarCampos } from "../miderwars/validar.js";
import helpersConductor from "../helpers/conductor.js";
import helpersGeneral  from "../helpers/general.js";
import { validarJWT } from "../miderwars/validar-jwt.js";

const router = new Router();

router.get("/all", validarJWT, httpConductor.getAllConductor)

router.post("/guardar",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('nombre').custom(helpersGeneral.verificarEspacios),
    check("nombre", "El nombre debe solo puede tener 15 caracteres").isLength({max: 15}),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check('cedula').custom(helpersGeneral.verificarEspacios),
    check("cedula", "Tiene que tener 10 digitos ").isLength({ min: 10, max: 10 }),
    check("cedula").custom(helpersConductor.existeCedula),
    validarCampos, validarJWT,
  ], httpConductor.postConductor
);

// router.get("/buscar/:cedula", httpConductor.getConductorCedula);

router.get("/buscar/:id",  httpConductor.getConductorId)

router.put("/editar/:id", [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check('nombre').custom(helpersGeneral.verificarEspacios),
  check("nombre", "El nombre debe solo puede tener 15 caracteres").isLength({max: 15}),
  check("cedula", "La cedula es obligatoria").notEmpty(),
  check("cedula", "Tiene que tener 10 digitos ").isLength({ min: 10, max: 10 }),
  check("cedula").custom(helpersConductor.existeCedula),
  validarCampos, validarJWT,
],  httpConductor.putConductor)

router.put("/inactivar/:id", validarJWT, httpConductor.putConductorInactivar)

router.put("/activar/:id", httpConductor.putConductorActivar)

// router.delete("/eliminar/:cedula",  httpConductor.deleteConductor);

router.delete("/borrar/:id", validarJWT,  httpConductor.deleteConductorId);

router.delete("/borrarAll", validarJWT, httpConductor.deleteAll)
export default router