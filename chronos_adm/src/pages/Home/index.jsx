import './Home.css'
import { VscEye } from "react-icons/vsc";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Home = () => {

  const [funcionarios, setFuncionarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);


  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('http://localhost:9000/funcionarios');
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar os funcionários", error);
      }
    };

    fetchFuncionarios();
  }, []);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get('http://localhost:9000/departamentos');
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os funcionários", error);
      }
    };

    fetchDepartamentos();
  }, []);

  return (

    <>
      <section id='inicio'>
        <h1 className='mb-5'>Bem vindo Administrador!</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">Departamentos</h3>
                <p className="card-text">Quantidade de usuários por departamento</p>

                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Departamento</th>
                      <th scope="col">Usuários</th>
                      <th scope="col" className='text-center'>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departamentos.length > 0 ? (
                      departamentos.map(departamento => (
                        <tr key={departamento.departament_id}>
                          <td>{departamento.departament_name}</td>
                          <td>{departamento.departament_quant}</td>
                          <td className='text-center'><Link to={`/visualizar-departamento/${departamento.departament_id}`}><VscEye /> </Link></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">Nenhum funcionário encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className='text-end mt-3'>
                <Link to={'/departamentos'}>Ver todos</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">Funcionários</h3>
                <p className="card-text">Últimos registros adicionados</p>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">E-mail</th>
                      <th scope="col" className='text-center'>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                  {funcionarios.length > 0 ? (
                      funcionarios.map(funcionario => (
                        <tr key={funcionario.funcionarios_id}>
                          <td>{funcionario.funcionarios_name}</td>
                          <td>{funcionario.funcionarios_email}</td>
                          <td className='text-center'><Link to={`/visualizar-funcionario/${funcionario.funcionarios_id}`}><VscEye /> </Link></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">Nenhum funcionário encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className='text-end mt-3'>
                <Link to={'/funcionarios'}>Ver todos</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;