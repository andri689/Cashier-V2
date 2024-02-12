import { where } from "sequelize"

class UserService {
    constructor(sequelize, user_model){
        this.sequelize = sequelize
        this.user_model= user_model
    }

    async store(data){
        try{
        // Konek ke database
        await this.sequelize.authenticate()
        // Migrate Up
        await this.sequelize.sync()
        // Query Insert
            const response = await this.user_model.create({
                username: data.username,
                password: data.password,
                role: data.role,
            })

            return response
        } catch (error){
            console.log(error)
        }
    }

    async find(username) {
        try{
            // Query untuk mencari akun user berdasarkan username.
            const user = await this.user_model.findAll({
                where: {
                    username: username,
                }
            });
            // Query di atas sama saja dengan:
            // Select * from users Where username = 'username;

            return user;
        } catch(err) {
            // Jika terdapat error, kembalikan nilai error
            return err;
        }
    }
}

export default UserService