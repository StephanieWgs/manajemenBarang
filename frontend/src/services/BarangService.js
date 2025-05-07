import axios from "axios";

const API_URL = "http://localhost:5000/api/barang/";

// Create Barang
export const createBarang = async (barang) => {
    try {
      const response = await axios.post(API_URL, barang);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

// Get All Barang
export const getAllBarang = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

// Get Barang by ID
export const getBarangById = async (id) => {
    try {
      const response = await axios.get(API_URL + id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

// Update Barang by ID
export const updateBarang = async (id, barang) => {
    try {
      const response = await axios.put(API_URL + id, barang);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

// Delete Barang by ID
export const deleteBarang = async (id) => {
    try {
      const response = await axios.delete(API_URL + id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};