import { Table, Thead, Tr, Th, Tbody, Td, Button } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
const BarangTable = ({ barang, handleKlikEdit, handleKlikHapus }) => {
  return (
    <Table variant={"simple"} my={10}>
      <Thead>
        <Tr>
          <Th textAlign={"center"} width={"5%"}>
            No
          </Th>
          <Th width={"15%"}>Kode Barang</Th>
          <Th>Nama Barang</Th>
          <Th textAlign={"center"} width={"20%"}>
            Stok
          </Th>
          <Th textAlign={"center"} width={"10%"}>
            Satuan
          </Th>
          <Th textAlign={"center"} width={"20%"}>
            Aksi
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {barang.length === 0 ? (
          <Tr>
            <Td colSpan={6} textAlign={"center"}>
              Belum ada barang yang ditambahkan... Silakan tambahkan barang
            </Td>
          </Tr>
        ) : (
          barang.map((item, index) => (
            <Tr key={index}>
              <Td textAlign={"center"}>{index + 1}</Td>
              <Td>{item.kodeBB}</Td>
              <Td>{item.namaBB}</Td>
              <Td textAlign={"center"}>{item.qty}</Td>
              <Td textAlign={"center"}>{item.satuan}</Td>
              <Td textAlign={"center"}>
                <Button leftIcon={<EditIcon />} colorScheme="yellow" onClick={() => handleKlikEdit(item)} size='sm'>
                  Edit
                </Button>
                <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => handleKlikHapus(item)} ml={2} size='sm'>
                  Hapus
                </Button>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
};

export default BarangTable;
