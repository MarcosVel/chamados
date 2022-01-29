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
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');

  function cleanInputs() {
    setNomeFantasia('');
    setCnpj('');
    setEndereco('');
    setTelefone('');
    setCelular('');
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (nomeFantasia !== '') {
      await firebase.firestore().collection('customers')
        .add({
          nomeFantasia: nomeFantasia,
          cnpj: cnpj,
          endereco: endereco,
          telefone: telefone,
          celular: celular,
        })
        .then(() => {
          setNomeFantasia('');
          setCnpj('');
          setEndereco('');
          setTelefone('');
          setCelular('');

          toast.success('Empresa cadastrada com sucesso!');
        })
        .catch((error) => {
          console.log(error);
          toast.error('Erro ao cadastrar');
        })
    } else {
      toast.error('Preencha o nome!');
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
            <label>Nome fantasia *</label>
            <input type="text" tabIndex={1} placeholder="Nome da sua empresa" required value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />

            <label>CNPJ</label>
            <InputMask mask='99.999.999/9999-99' tabIndex={2} placeholder="__.___.___/____-__" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

            <label>Endereço</label>
            <input type="text" name="endereco" tabIndex={3} placeholder='Rua, num, bairro' value={endereco} onChange={(e) => setEndereco(e.target.value)} />

            <div className='phone'>
              <div>
                <label>Telefone</label>
                <InputMask mask='(99) 9999-9999' tabIndex={4} placeholder="(__) ____-____" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>

              <div>
                <label>Celular</label>
                <InputMask mask='(99) 99999-9999' tabIndex={5} placeholder="(__) _____-____" value={celular} onChange={(e) => setCelular(e.target.value)} />
              </div>
            </div>

            <div className="flex">
              <button type='reset' tabIndex={7} className="btn-reset" onClick={() => cleanInputs()}>Limpar</button>
              <button type="submit" tabIndex={6} className="btn-register">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Customers;
