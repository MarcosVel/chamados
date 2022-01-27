import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import firebase from '../../services/firebaseConnection';
import './styles.css';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  useEffect(() => {
    loadChamados();

    // Quando componente for desmontado
    return () => {

    }
  }, []);

  async function loadChamados() {
    await listRef.limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao buscar chamados');
        setLoadingMore(false);
      })

    setLoading(false);
  }

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFromated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          descricao: doc.data().descricao,
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length - 1]; // Pegando o último documento buscado

      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);
  }

  return (
    <div className="page">
      <Nav />

      <div className="content">
        <Title name='Atendimentos'>
          <FiMessageSquare size='24' />
        </Title>

        {loading ?
          <div className="container dashboard" style={{ justifyContent: 'center' }}>
            <span>Buscando chamados...</span>
          </div>
          :
          <>
            {chamados.length === 0 ?
              <div className="container dashboard">
                <span>Nenhum chamado registrado...</span>

                <Link to='/new' className='new'>
                  <FiPlus size='24' color='#fff' />
                  Novo chamado
                </Link>
              </div>
              :
              <>
                <Link to='/new' className='new mtb-24'>
                  <FiPlus size='24' color='#fff' />
                  Novo chamado
                </Link>

                <table>
                  <thead>
                    <tr>
                      <th scope='col'>Cliente</th>
                      <th scope='col'>Assunto</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Cadastrado em</th>
                      <th scope='col'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chamados.map((item, index) => (
                      <tr key={index}>
                        <td data-label='Cliente'>{item.cliente}</td>
                        <td data-label='Assunto'>{item.assunto}</td>
                        <td data-label='Status'>
                          <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : item.status === 'Progresso' ? '#3583f6' : '#999' }}>{item.status}</span>
                        </td>
                        <td data-label='Cadastrado'>{item.createdFromated}</td>
                        <td data-label='Ações'>
                          <button className="action" style={{ backgroundColor: '#3583f6' }}>
                            <FiSearch color='#fff' size='17' />
                          </button>
                          <button className="action" style={{ backgroundColor: '#f6a935' }}>
                            <FiEdit2 color='#fff' size='17' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            }
          </>
        }
      </div>
    </div>
  )
}

export default Dashboard;
