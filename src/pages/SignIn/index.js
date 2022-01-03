import { useContext, useState } from 'react'
import './styles.css'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      signIn(email, password);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt='logo' />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="email" placeholder='nome@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='****' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Acessar</button>
        </form>

        <Link to='/register'>Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
