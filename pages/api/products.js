// HTTP method
// - GET -> Mengambil data
// - POST -> Menambah Data
// - DELETE -> Menghapus Data
// -> PUT -> Mengedit / Mengubah Data
// /api/products -> POST, GET, DELETE, PUT

import ProductService from "../../service/ProductService";
import sequelize from "../../config/database";
import Product from "../../model/product";

export default async function handler(req, res) {
  try {
    const productService = new ProductService(sequelize, Product);

    if (req.method === "POST") {
      const addProduct = await productService.store({
        name: req.body.name,
        quantity: req.body.quantity,
        description: req.body.description,
        price: req.body.price,
      });

      return res.status(200).json({
        message: "Successfully add product data",
        data: addProduct,
      });
    } else if (req.method === "GET") {
      const products = await productService.getAll(); // Mengambil semua produk dari database
      console.log(products);
      return res.status(200).json(products); // Mengirimkan data produk sebagai respons
    } else if (req.method === "DELETE") {
      const productId = req.query.productId;

      const deletedProduct = await productService.delete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: "Successfully deleted product",
        data: deletedProduct,
      });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
}
