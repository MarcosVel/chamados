import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import './styles.css';

function New() {
  const { id } = useParams();
  const history = useHistory();

  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [descricao, setDescricao] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [idCustomer, setIdCustomer] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCustomers() {
      await firebase.firestore().collection('customers')
        .get()
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            })
          })

          if (lista.length === 0) {
            console.log('Nenhuma empresa encontrada');
            setCustomers([{ id: '1', nomeFantasia: 'Freela' }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);

          if (id) {
            loadId(lista);
          }
        })
        .catch(err => {
          console.log('Deu erro', err);
          setLoadCustomers(false);
          setCustomers([{ id: '1', nomeFantasia: '' }]);
        })
    }

    loadCustomers();
  }, [id]);

  async function loadId(lista) {
    await firebase.firestore().collection('chamados').doc(id)
      .get()
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setDescricao(snapshot.data().descricao);

        let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Chamado não encontrado');
      })

    return;
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (idCustomer) {
      firebase.firestore().collection('chamados')
        .doc(id)
        .update({
          cliente: customers[customerSelected].nomeFantasia,
          assunto: assunto,
          status: status,
          descricao: descricao,
        })
        .then(() => {
          toast.success('Chamado atualizado');
          history.push('/dashboard');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Erro ao atualizar');
        })

      return;
    }

    await firebase.firestore().collection('chamados')
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        descricao: descricao,
        userId: user.uid
      })
      .then(() => {
        toast.success('Chamado criado com sucesso!');
        setDescricao('');
        setCustomerSelected(0);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Ops, erro ao criar chamado!')
      })
  }

  function handleChangeStatus(e) {
    setStatus(e.target.value);
  }

  function handleChangeCustomers(e) {
    // console.log('index cliente selecionado', e.target.value);
    // console.log('cliente selecionado', customers[e.target.value]);
    setCustomerSelected(e.target.value);
  }

  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Novo chamado'>
          <FiPlusCircle size='24' />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>
            {loadCustomers ?
              <input type="text" disabled={true} value='Carregando clientes...' style={{ minHeight: '45px' }} />
              :
              <select value={customerSelected} onChange={handleChangeCustomers}>
                {customers.map((item, index) => (
                  <option key={item.id} value={index}>{item.nomeFantasia}</option>
                ))}
              </select>
            }

            <label>Assunto</label>
            <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
              <option key={1} value='Suporte'>Suporte</option>
              <option key={2} value='Visita técnica'>Visita técnica</option>
              <option key={3} value='Financeiro'>Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <label className="status-label">
                <input
                  type="radio"
                  name="radio"
                  value="Aberto"
                  onChange={handleChangeStatus}
                  checked={status === 'Aberto'}
                />
                Em aberto
              </label>
              <label className="status-label">
                <input
                  type="radio"
                  name="radio"
                  value="Progresso"
                  onChange={handleChangeStatus}
                  checked={status === 'Progresso'}
                />
                Progresso
              </label>
              <label className="status-label">
                <input
                  type="radio"
                  name="radio"
                  value="Atendido"
                  onChange={handleChangeStatus}
                  checked={status === 'Atendido'}
                />
                Atendido
              </label>
            </div>

            <label id="description">Descrição</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <button type="submit">{idCustomer === true ? 'Atualizar' : 'Registrar'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default New;
