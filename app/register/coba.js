// "use client";
// import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";

// export default function Register() {
//   const [formUser, setForm] = useState({
//     username: "",
//     password: "",
//     role: "",
//   });

//   const [pesan, setPesan] = useState("");

//   const [tampil, setTampil] = useState("");

//   const [warna, setWarna] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const registerAPI = await fetch("/api/signup", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(formUser),
//     });

//     const result = await registerAPI.json();

//     // cek status
//     if (result.status == "success") {
//       setWarna("success");
//     } else if (result.status == "fail") {
//       setWarna("danger");
//     }
//     // Update data pesan
//     setPesan(result.message);

//     // Update status tampil dari 'false ke true
//     setTampil(result.message);

//     console.log(result);
//   };

//   return (
//     <>
//       <Navbar bg="primary" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="/login">signin</Nav.Link>
//             <Nav.Link href="/register">signup</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       <Container>
//         {tampil && <Alert variant={warna}>{pesan}</Alert>}
//         <Form>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               value={formUser.username}
//               onChange={(e) =>
//                 setForm({ ...formUser, username: e.target.value })
//               }
//               placeholder="Masukan Username Anda"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={formUser.password}
//               onChange={(e) =>
//                 setForm({ ...formUser, password: e.target.value })
//               }
//               placeholder="Password"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicCheckbox">
//             <Form.Select
//               aria-label="Default select example"
//               onChange={(e) => setForm({ ...formUser, role: e.target.value })}
//             >
//               <option>Pilih Tipe Akun</option>
//               <option value="admin">Admin</option>
//               <option value="petugas">Petugas</option>
//             </Form.Select>
//           </Form.Group>
//           <Button variant="primary" type="submit" onClick={handleRegister}>
//             Submit
//           </Button>
//         </Form>
//       </Container>
//     </>
//   );
// }