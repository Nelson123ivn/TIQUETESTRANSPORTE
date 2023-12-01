import { Router } from "express";
import httpCliente from "../controllers/cliente.js";
import { check } from "express-validator";
import { validarCampos } from "../miderwars/validar.js";
import { mongo } from "mongoose";
import helpersCliente from "../helpers/cliente.js"
import helpersGeneral  from "../helpers/general.js";
import { validarJWT } from "../miderwars/validar-jwt.js";

const router = new Router();

router.get("/all", validarJWT, httpCliente.getAllCliente);

router.get("/buscarCC/:cedula", validarJWT, httpCliente.getClienteCedula);

router.get("/buscar/:id", validarJWT, httpCliente.getClienteId)
 
router.post(
  "/guardar",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('nombre').custom(helpersGeneral.verificarEspacios),
    check("nombre", "Máximo 15 caracteres").isLength({ max: 15 }),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check("cedula", "Tiene que tener entre 8 y 10 digitos").isLength({
      min: 8,
      max: 10,
    }),
    check("cedula", "La cedula esta duplicada").custom(helpersCliente.existeCedula),
    check('email', "El email es requerido").not().isEmpty(),
    check('email').custom(helpersGeneral.verificarEspacios),
    check("email", "El email debe contener el símbolo @").custom(helpersCliente.validarEmail),
    check("email", "El email ya existe").custom(helpersCliente.existeEmail),
    validarCampos,  validarJWT,
  ],
  httpCliente.postCliente
  );  

router.put("/editar/:id", [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check('nombre').custom(helpersGeneral.verificarEspacios),
  check("nombre", "Máximo 15 caracteres").isLength({ max: 15 }),
  check("cedula", "La cedula es obligatoria").notEmpty(),
  check("cedula", "Tiene que tener entre 8 y 10 digitos").isLength({
    min: 8,
    max: 10,
  }),
  check("cedula", "La cedula esta duplicada").custom(helpersCliente.existeCedula),
  check('email', "El email es requerido").notEmpty(),
  check('email').custom(helpersGeneral.verificarEspacios),
  check("email", "El email debe contener el símbolo @").custom(helpersCliente.validarEmail),
  check("email", "El email ya existe").custom(helpersCliente.existeEmail),
  validarCampos,  validarJWT,
],httpCliente.putCliente);

router.put("/inactivar/:id", validarJWT, httpCliente.putClienteInactivar)

router.put("/activar/:id", validarJWT, httpCliente.putClienteActivar)

router.delete("/eliminar/:cedula", validarJWT, httpCliente.deleteCliente)

router.delete("/borrar/:id", validarJWT, httpCliente.deleteClienteId)
router.delete("/borrarAll", validarJWT, httpCliente.deleteAll)
export default router;
