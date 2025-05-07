const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
  kodeBB: {
    type: String,
    required: true,
  },
  namaBB: {
    type: String,
    required: true,
  },
  satuan: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Barang", barangSchema);
