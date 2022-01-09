import { useContext, useState } from 'react';
import { FiLogOut, FiSettings, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Avatar from '../../assets/avatar.png';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import '../../helpers/globals.css';
import firebase from '../../services/firebaseConnection';
import './styles.css';

function Settings() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if(image.type === 'image/jpg' || image.type === 'image/jpeg'|| image.type === 'image/png') {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert('Envie uma imagem do tipo PNG, JPEG ou JPG');
        setImageAvatar(null);
        return null;
      }
    }
  }

  function handleUpload() {

  }

  async function handleSave(e) {
    e.preventDefault();

    if (imageAvatar == null && name !== '') {
      await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          nome: name
        })
        .then(() => {
          let data = {
            ...user,
            nome: name
          };
          setUser(data);
          storageUser(data);
          toast.success('Nome atualizado!');
        })
        .catch((error) => {
          console.error(error);
          toast.error('Erro ao atualizar nome');
        })
    }
    else if (name !== '' && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Minha conta'>
          <FiSettings size='24' />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size='24' />
              </span>

              <input type="file" accept='image/*' onChange={handleFile} /><br />
              {avatarUrl == null ?
                <img src={Avatar} alt="Avatar" />
                :
                <img src={avatarUrl} width='250' height='250' alt="User" />
              }
            </label>

            <label className="form-label">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label className="form-label">E-mail</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button type='submit' className="btn-logout" onClick={() => signOut()}>
            <FiLogOut size='22' style={{ marginRight: '8px' }} />
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings;
