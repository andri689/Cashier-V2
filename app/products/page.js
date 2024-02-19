"use client";

import Sidebar from "../../components/Sidebar";
import Wrapper from "../../components/Wrapper";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Products() {
  const [tampilkan, setTampilkan] = useState(false);
  const handleTampilkanAku = () => {
    setTampilkan(true);
  };

  const handleTutupModalBox = () => {
    setTampilkan(false);
  };

  const [formProduct, setFormProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    price: "",
  });
  // const [products, setProducts] = useState([]);

  const handleProduct = async (e) => {
    e.preventDefault();
    const productAPI = await fetch("/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formProduct),
    });
    const result = await productAPI.json();
    setProducts([...products, result.data]);
    handleTutupModalBox(); // Tutup modal setelah berhasil menambahkan produk
  };

  // Pastikan bahwa state products diinisialisasi sebagai array kosong
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  // const handleDeleteProduct = async (productId) => {
  //   try {
  //     const response = await fetch(`/api/products/${productId}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete product");
  //     }
  //     setProducts(products.filter((product) => product.id !== productId));
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };

  const handleDelete = async (index) => {
    const deleteProduct = products[index];
    if (deleteProduct && deleteProduct.id) { // Memeriksa apakah deleteProduct tidak kosong dan memiliki properti id
      try {
        await fetch(`/api/products/${deleteProduct.id}`, {
          method: 'DELETE',
        });
        // Lakukan sesuatu setelah penghapusan berhasil, misalnya memperbarui state atau menyegarkan data
      } catch (error) {
        console.error('Error deleting product:', error);
        // Lakukan penanganan kesalahan jika diperlukan
      }
    } else {
      console.error('Product not found or does not have an ID');
      // Lakukan penanganan jika produk tidak ditemukan atau tidak memiliki ID
    }
  };
  
  return (
    <>
      <Sidebar />
      <Wrapper
        childrenElement={
          <>
            <div className="ms-3">
              <h2>Product</h2>
              <Button className="shadow" onClick={handleTampilkanAku}>
                Tambah Product
              </Button>
            </div>

            <Modal show={tampilkan} onHide={handleTutupModalBox}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nama Barang"
                      value={formProduct.name}
                      onChange={(e) =>
                        setFormProduct({ ...formProduct, name: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Quantitas</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Jumlah Barang"
                      value={formProduct.quantity}
                      onChange={(e) =>
                        setFormProduct({
                          ...formProduct,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Deskripsi Barang"
                      value={formProduct.description}
                      onChange={(e) =>
                        setFormProduct({
                          ...formProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Harga</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Harga Barang per item"
                      value={formProduct.price}
                      onChange={(e) =>
                        setFormProduct({
                          ...formProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleTutupModalBox}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleProduct}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <div>
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Kuantitas</th>
                    <th>Deskripsi</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(products) &&
                    products.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>
                          <Button variant="warning">Update</Button>{" "}
                        </td>
                        <td>
                        <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>{' '}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </>
        }
      />
    </>
  );
}
