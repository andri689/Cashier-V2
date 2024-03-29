class ProductService {
    constructor(sequelize, product_model) {
      this.sequelize = sequelize;
      this.product_model = product_model;
    }
  
    async store(data) {
      try {
        // Konek database
        await this.sequelize.authenticate();
  
        // Migrate up
        await this.sequelize.sync();
  
        // Masukkan data ke database.
        const result = await this.product_model.create({
          name: data.name,
          quantity: data.quantity,
          description: data.description,
          price: data.price,
        });
  
        // Kembalikan hasil data
        return result;
      } catch (error) {
        // Jika terdapat error, kembalikan nilai error
        return error;
      }
    }
    async getAll(){
      try{
        await this.sequelize.authenticate();
        // await this.sequelize.sync();
        const result = await this.product_model.findAll()
        return result        
      }catch(error){
        return error;
      }
    }
    async delete(productId) {
      try {
        // Anda tidak perlu memanggil authenticate() di sini, karena koneksi ke database sudah diverifikasi saat objek ProductService dibuat.
        const productToDelete = await this.product_model.findByPk(productId);
        if (!productToDelete) {
          throw new Error('Product not found');
        }
        await productToDelete.destroy();
        return productToDelete;
      } catch (error) {
        return error;
      }
    }
  }
  
  export default ProductService;