// api-routes.js
// Inicializamos express routeo
let router = require('express').Router();
// Seteamos ruta Principal /api/
router.get('/', function (req, res) {
    res.json({
        status: 'Api trabajando para usted',
        message: 'Bienvenido a la raiz API',
    });
});
// importamos Controlador
var contactController = require('./controller/contactController');
// Rutas de contacto test
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);
// Exportamos el modulo de ruteo
module.exports = router;