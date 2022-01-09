import { useContext, useState } from 'react';
import { FiSettings, FiUpload } from 'react-icons/fi';
import Avatar from '../../assets/avatar.png';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import '../../helpers/globals.css';
import './styles.css';

function Settings() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Minha conta'>
          <FiSettings size='24' />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size='24' />
              </span>

              <input type="file" accept='image/' /><br />
              {avatarUrl == null ?
                <img src={Avatar} alt="Avatar" />
                :
                <img src={user.avatarUrl} alt="User image" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label>E-mail</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings;
