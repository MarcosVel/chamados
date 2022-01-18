import { useState } from "react";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import './styles.css';

function Dashboard() {
  const [chamados, setChamados] = useState([]);

  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Atendimentos'>
          <FiMessageSquare size='24' />
        </Title>

        {chamados.length === 0 ?
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to='/new' className='new'>
              <FiPlus size='24' color='#fff' />
              Novo chamado
            </Link>
          </div>
          :
          <Link to='/new' className='new'>
            <FiPlus size='24' color='#fff' />
            Novo chamado
          </Link>
        }

      </div>
    </div>
  )
}

export default Dashboard;
