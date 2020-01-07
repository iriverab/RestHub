// contactController.js
// Importamos modelo
Contact = require('../model/contactModel');
// trigger acciones index
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Get de Contactos tomados correctamente",
            data: contacts
        });
    });
};
// gatillamos contact accion
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // grabamos y buscamos error
    contact.save(function (err) {
        res.json({
            message: 'nuevo contacto creado',
            data: contact
        });
    });
};
// gatillamos info de contacto
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contacto cargando detalle',
            data: contact
        });
    });
};
// gatillamos update de info de contacto
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        // grabamos y chequeamos el error
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contacto actualizado',
                data: contact
            });
        });
    });
};
// gatillamos el evento de borrado
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contacto Eliminado'
        });
    });
};