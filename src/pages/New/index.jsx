import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import './styles.css';

function New() {

  function handleRegister(e) {
    e.preventDefault();

    alert('teste')
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
            <select>
              <option key={1} value='suporte'>Suporte</option>
              <option key={1} value='Visita tecnica'>Visita técnica</option>
              <option key={1} value='financeiro'>Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <label className="status-label">
                <input type="radio" name="radio" value="aberto" />
                Em aberto
              </label>
              <label className="status-label">
                <input type="radio" name="radio" value="progresso" />
                Progresso
              </label>
              <label className="status-label">
                <input type="radio" name="radio" value="atendido" />
                Atendido
              </label>
            </div>

            <label id="description">Descrição</label>
            <textarea type="text" placeholder="Descreva seu problema (opcional)"></textarea>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default New;
