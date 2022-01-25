import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import './styles.css';

function New() {
  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [descricao, setDescricao] = useState('')

  function handleRegister(e) {
    e.preventDefault();

    alert('teste')
  }

  function handleChangeStatus(e) {
    setStatus(e.target.value);
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
            <select name="" id="">
              <option key={1} value={1}>Sujeito Programador</option>
            </select>

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

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default New;
