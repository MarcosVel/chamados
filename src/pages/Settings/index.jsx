import '../../helpers/globals.css';
import './styles.css';
import Nav from '../../components/Nav';
import Title from '../../components/Title';

import { FiSettings } from 'react-icons/fi'

function Settings() {
  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Minha conta'>
          <FiSettings size='24' />
        </Title>
      </div>
    </div>
  )
}

export default Settings;
