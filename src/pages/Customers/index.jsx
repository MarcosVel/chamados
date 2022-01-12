import { FiUser } from 'react-icons/fi';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import './styles.css';

function Customers() {
  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Clientes'>
          <FiUser size='24' />
        </Title>
      </div>
    </div>
  )
}

export default Customers;
