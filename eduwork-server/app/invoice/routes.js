const router = require("express").Router();
const invoiceController = require("./controller");

router.get("/invoices/", invoiceController.index);
router.get("/invoices/:order_id", invoiceController.show);
router.put("/invoices/:order_id/pay", invoiceController.update);

module.exports = router;
