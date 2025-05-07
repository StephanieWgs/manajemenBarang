import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const BarangModal = ({ isOpen, onClose, onSave, barang }) => {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [satuan, setSatuan] = useState("");
  const [stok, setStok] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset / Isi Form berdasarkan props
  useEffect(() => {
    if (barang) {
      setKode(barang.kodeBB || "");
      setNama(barang.namaBB || "");
      setSatuan(barang.satuan || "");
      setStok(barang.qty?.toString() || "");
    } else {
      setKode("");
      setNama("");
      setSatuan("");
      setStok("");
    }
    setErrorMessage("");
  }, [barang, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kode || !nama || !satuan || !stok) {
      setErrorMessage("Semua field harus diisi!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = {
        kodeBB: kode,
        namaBB: nama,
        satuan: satuan,
        qty: parseInt(stok),
      };
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error(error);
      setErrorMessage("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset semua state & tutup modal
  const handleClose = () => {
    setKode("");
    setNama("");
    setSatuan("");
    setStok("");
    setErrorMessage("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{barang ? "Edit Barang" : "Tambah Barang"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errorMessage}>
              <FormLabel>Kode Barang</FormLabel>
              <Input value={kode} onChange={(e) => setKode(e.target.value)} placeholder="Masukkan kode barang" />
            </FormControl>
            <FormControl isInvalid={!!errorMessage}>
              <FormLabel>Nama Barang</FormLabel>
              <Input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan nama barang" />
            </FormControl>
            <FormControl isInvalid={!!errorMessage}>
              <FormLabel>Satuan</FormLabel>
              <Input value={satuan} onChange={(e) => setSatuan(e.target.value)} placeholder="Masukkan satuan barang" />
            </FormControl>
            <FormControl isInvalid={!!errorMessage}>
              <FormLabel>Stok</FormLabel>
              <Input type="number" value={stok} onChange={(e) => setStok(e.target.value)} placeholder="Masukkan stok barang" />
              {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Batal
          </Button>
          <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BarangModal;
