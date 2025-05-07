import { useState, useEffect, useRef } from "react";
import { useToast, useDisclosure, Container, Heading, Flex, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Box } from "@chakra-ui/react";
import BarangTable from "../components/barangTable";
import BarangModal from "../components/barangModal";
import * as BarangService from "../services/BarangService"; //penghubung dengan backend.

const BarangPage = () => {
  const [barang, setBarang] = useState([]); //list barang
  const [showModal, setShowModal] = useState(false); //buka atau tutup modal tambah / edit barang
  const [selectedBarang, setSelectedBarang] = useState(null); // jika null = tambah barang, jika ada = edit barang

  const [selectedBarangHapus, setSelectedBarangHapus] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For alert dialog
  const cancelRef = useRef();

  const toast = useToast();

  // Fungsi untuk mengambil semua barang
  const fetchBarang = async () => {
    try {
      const response = await BarangService.getAllBarang();
      setBarang(response || []);
    } catch (error) {
      console.error(error);
      setBarang([]);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  // Fungsi ketika klik tombol tambah barang baru
  const handleKlikTambah = () => {
    setSelectedBarang(null);
    setShowModal(true);
  };

  // Fungsi ketika klik tombol edit barang
  const handleKlikEdit = (barang) => {
    setSelectedBarang(barang);
    setShowModal(true);
  };

  // Fungsi ketika ingin tambah / edit barang setelah modal muncul
  const handleSave = async (barang) => {
    try {
      if (selectedBarang) {
        await BarangService.updateBarang(selectedBarang._id, barang);
        toast({
          title: "Barang berhasil diubah",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        await BarangService.createBarang(barang);
        toast({
          title: "Barang berhasil ditambahkan",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
      fetchBarang();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi ketik klik tombol hapus barang
  const handleKlikHapus = async (barang) => {
    setSelectedBarangHapus(barang);
    onOpen(); //Membuka alert dialog
  };

  // Fungsi ketika ingin hapus barang setelah modal muncul
  const handleHapus = async () => {
    try {
      await BarangService.deleteBarang(selectedBarangHapus._id);
      toast({
        title: "Barang berhasil dihapus",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      fetchBarang();
      onClose(); //Menutup alert dialog
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg="gray.100" minHeight="100vh">
      <Container maxW={"container.xl"} px={16} py={10}>
        <Flex justifyContent={"space-between"} align={"center"} mb={4}>
          <Heading size="lg">Daftar Barang</Heading>
          <Button colorScheme="green" variant="solid" boxShadow="md" onClick={handleKlikTambah}>
            Tambah Barang
          </Button>
        </Flex>

        <Box bg="white" px={4} borderRadius="lg" borderWidth="1px" mt={10}>
          <BarangTable barang={barang} handleKlikEdit={handleKlikEdit} handleKlikHapus={handleKlikHapus} />
        </Box>

        <BarangModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleSave} barang={selectedBarang} />

        {/* Alert hapus barang */}
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Konfirmasi Hapus Barang
              </AlertDialogHeader>
              <AlertDialogBody>Apakah Anda yakin ingin menghapus barang ini?</AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Batal
                </Button>
                <Button colorScheme="red" onClick={handleHapus} ml={3}>
                  Hapus
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </Box>
  );
};

export default BarangPage;
