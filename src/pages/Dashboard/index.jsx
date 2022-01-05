import { useContext } from "react";
import Nav from "../../components/Nav";
import { AuthContext } from "../../contexts/auth";

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <Nav />
      <h1>Dashboard</h1>
      <button onClick={ () => signOut() }>Fazer logout</button>
    </div>
  )
}

export default Dashboard;
