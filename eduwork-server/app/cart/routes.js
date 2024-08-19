const router = require("express").Router();
// const { police_check } = require("../../middlewares");
const cartController = require("./controller");

// const tes = (app) => {
//   app.put(
//     "/api/carts",

//     // police_check("update", "Cart"),
//     cartController.update
//   );
//   app.get(
//     "/api/carts",
//     // police_check("read", "Cart"),
//     cartController.index
//   );
// };

router.put(
  "/carts",

  // police_check("update", "Cart"),
  cartController.update
);
router.get(
  "/carts",
  // police_check("read", "Cart"),
  cartController.index
);

// module.exports = tes;

module.exports = router;
