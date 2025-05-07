const barang = require("../models/barang");

// Create Barang
exports.createBarang = async (req, res) => {
  try {
    const { kodeBB, namaBB, satuan, qty } = req.body;
    const newBarang = new barang({ kodeBB, namaBB, satuan, qty });
    const savedNote = await newBarang.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read / semua barang
exports.getAllBarang = async (req, res) => {
  try {
    //-1 = Z → A, 10 → 1, Terbaru → Terlama
    // 1 = A → Z, 1 → 10, Terlama → Terbaru
    const barangs = await barang.find().sort({ createdAt: -1 });
    res.status(200).json(barangs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read / Get barang by id
exports.getBarangById = async (req, res) => {
  try {
    const barang = await barang.findById(req.params.id);
    res.status(200).json(barang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Barang by ID
exports.updateBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { kodeBB, namaBB, satuan, qty } = req.body;
    const updatedBarang = await barang.findByIdAndUpdate(id, { kodeBB, namaBB, satuan, qty }, { new: true });
    res.status(200).json(updatedBarang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Barang by ID
exports.deleteBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBarang = await barang.findByIdAndDelete(id);
    res.status(200).json(deletedBarang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
