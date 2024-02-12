// "use client";
// import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";

// export default function Login() {
//   const [formUser, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const [pesan, setPesan] = useState("");

//   const [tampil, setTampil] = useState("");

//   const [warna, setWarna] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // Masukkan data ke server
//     const LoginAPI = await fetch("/api/signin", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(formUser),
//     });

//     const result = await LoginAPI.json();

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
//       <Container>
//         {tampil && <Alert variant={warna}>{pesan}</Alert>}
//         <Form>
//           <fieldset>
//             <Form.Group className="mb-3">
//               <Form.Label htmlFor="disabledTextInput">Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={formUser.username}
//                 onChange={(e) =>
//                   setForm({ ...formUser, username: e.target.value })
//                 }
//                 id="disabledTextInput"
//                 placeholder="Masukkan Username Anda"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={formUser.password}
//                 onChange={(e) =>
//                   setForm({ ...formUser, password: e.target.value })
//                 }
//                 id="disabledTextInput"
//                 placeholder="Masukkan Password Anda"
//               />
//             </Form.Group>
//             <Button type="submit" onClick={handleLogin}>
//               Submit
//             </Button>
//           </fieldset>
//         </Form>
//       </Container>
//     </>
//   );
// }
