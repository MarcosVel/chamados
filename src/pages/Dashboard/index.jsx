import { useContext } from "react";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import './styles.css';

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Atendimentos'>
          <FiMessageSquare size='24' />
        </Title>

        <div className="container dashboard">
          <span>Nenhum chamado registrado...</span>

          <Link to='/new' className='new'>
            <FiPlus size='24' color='#fff' />
            Novo chamado
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
