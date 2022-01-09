import '../../helpers/globals.css';
import './styles.css';
import Nav from '../../components/Nav';
import Title from '../../components/Title';

import { FiSettings, FiUpload } from 'react-icons/fi'

function Settings() {
  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Minha conta'>
          <FiSettings size='24' />
        </Title>

        <div className="container">
          <form>
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size='24'  />
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings;
