import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper"

export default function UserManagement() {
  return (
    <>
      <Sidebar />
      <Wrapper childrenElement={<>
        <h1>ini halaman User Management</h1>
        <p>ini  paragraf</p>
        </>} />

    </>
  )
}