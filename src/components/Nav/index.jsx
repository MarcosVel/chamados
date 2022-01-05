import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import './styles.css';

import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

function Nav() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl == null ? Avatar : user.avatarUrl} alt="User avatar" />
      </div>

      <nav>
        <Link to='/dashboard'>
          <FiHome color='#fff' size='24' />
          Chamados
        </Link>
        <Link to='/profile'>
          <FiUser color='#fff' size='24' />
          Clientes
        </Link>
        <Link to='/settings'>
          <FiSettings color='#fff' size='24' />
          Configurações
        </Link>
      </nav>
    </div>

  )
}

export default Nav;