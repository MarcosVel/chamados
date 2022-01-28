import React from 'react';
import { FiX } from 'react-icons/fi';
import './styles.css';

function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container-modal">
        <div>
          <h2>Detalhes do chamado</h2>
          
          <button className="close" onClick={close}>
            <FiX size={20} color='#fff' />
            Fechar
          </button>
        </div>

        <div className="row">
          <span>
            Cliente: <p>{conteudo.cliente}</p>
          </span>
        </div>
        <div className="row">
          <span>
            Assunto: <p>{conteudo.assunto}</p>
          </span>
          <span>
            Cadastrado em: <p>{conteudo.createdFormated}</p>
          </span>
        </div>
        <div className="row">
          <span>
            Status: <p style={{ color: '#fff', padding: '5px', borderRadius: '3px', backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : conteudo.status === 'Progresso' ? '#3583f6' : '#999' }}>{conteudo.status}</p>
          </span>
        </div>

        {conteudo.descricao !== '' &&
          <>
            <h3>Descrição:</h3>
            <p>{conteudo.descricao}</p>
          </>
        }
      </div>
    </div>
  );
}

export default Modal;
