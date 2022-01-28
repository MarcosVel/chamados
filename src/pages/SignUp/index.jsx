import { useContext, useState } from 'react'
import './styles.css'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== '' && email !== '' && password !== '') {
      signUp(name, email, password);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt='logo' />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Crie sua conta</h1>
          <input type="text" placeholder='Seu nome' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder='nome@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} />
          <p style={{ marginBottom: 16, color: '#555555'}}>Obs.: Sua senha deve possuir no mínimo 6 caracteres</p>
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>

        <Link to='/'>Já tem uma conta? Entre</Link>
      </div>
    </div>
  );
}

export default SignUp;
