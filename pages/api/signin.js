// import sequelize from "@/config/database";
import sequelize from "../../config/database";
import User from "../../model/user";
import bcrypt from "bcrypt";
import UserService from "../../service/UserService";

export default async function POST(req, res) {
  try {
    const userService = new UserService(sequelize, User);
    // Ambil data request
    const username = req.body.username;
    // Ambil data password
    const password = req.body.password;

    const result = await userService.find(username);

    if (result.length == 0) {
      return res.status(200).json({
        message: "User Belum terdaftar, silahkan register dulu",
        status: "fail",
      });
    }

    const hash = result[0].password;

    const cekPassword = bcrypt.compareSync(password, hash);

    if (!cekPassword) {
      return res.status(400).json({
        message: "Password Salah",
        status: "fail",
      });
    }

    return res.status(200).json({
      message: "Berhasil Login",
      status: "success",
      dashboardURL: '/products'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: `Terdapat error ${error}`,
    });
  }
}
