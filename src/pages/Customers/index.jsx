import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import './styles.css';

function Customers() {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  function cleanInputs() {
    setNomeFantasia('');
    setCnpj('');
    setEndereco('');
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
      await firebase.firestore().collection('customers')
        .add({
          nomeFantasia: nomeFantasia,
          cnpj: cnpj,
          endereco: endereco
        })
        .then(() => {
          setNomeFantasia('');
          setCnpj('');
          setEndereco('');

          toast.success('Empresa cadastrada com sucesso!');
        })
        .catch((error) => {
          console.log(error);
          toast.error('Erro ao cadastrar');
        })
    } else {
      toast.error('Preencha todos os campos!');
    }
  }

  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Clientes'>
          <FiUser size='24' />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome fantasia</label>
            <input type="text" placeholder="Nome da sua empresa" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />

            <label>CNPJ</label>
            <InputMask mask='99.999.999/9999-99' placeholder="01.234.567/8910-12" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

            <label>Endereço</label>
            <input type="text" name="endereco" placeholder='Rua, num, bairro' value={endereco} onChange={(e) => setEndereco(e.target.value)} />

            <div className="flex">
              <button type='reset' className="btn-reset" onClick={() => cleanInputs()}>Limpar</button>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Customers;
