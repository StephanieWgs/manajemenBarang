const express = require("express");
const barangController = require("../controllers/barangController");

const router = express.Router();

router.get("/", barangController.getAllBarang);
router.get("/:id", barangController.getBarangById);
router.post("/", barangController.createBarang);
router.put("/:id", barangController.updateBarang);
router.delete("/:id", barangController.deleteBarang);

module.exports = router;
