const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/customers", require("./CustomerRoutes"));
router.use("/api/quotation", require("./QuotationRoutes"));

//test route
router.get("/", (req, res) => {
  res.send("API Working");
});

module.exports = router;
