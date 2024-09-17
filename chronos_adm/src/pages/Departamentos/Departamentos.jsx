import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



// ============ Icons
import { VscEye, VscAdd, VscClose, VscChevronRight, VscHome } from "react-icons/vsc";

//=========== components e css
import './Departamentos.css';

const Departamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout;

    // Função para buscar dados do backend
    const fetchDepartamentos = async () => {
        try {
            // Definindo o tempo limite para a requisição
            timeout = setTimeout(() => {
                if (loading) {
                    setError('A requisição está demorando mais do que o esperado.');
                    setLoading(false); // Parar o spinner
                }
            }, 10000); // 10 segundos

            const response = await axios.get('http://localhost:9000/departamentos');
            setDepartamentos(response.data);
            setLoading(false); // Dados carregados, parar o spinner
        } catch (err) {
            setError('Ocorreu um erro ao carregar os dados.');
            setLoading(false); // Mesmo em erro, parar o spinner
        } finally {
            clearTimeout(timeout); // Limpar o tempo limite se a requisição for completada
        }
    };

    fetchDepartamentos();
    
    // Limpar o timeout se o componente for desmontado antes de a requisição ser completada
    return () => clearTimeout(timeout);
}, []);

  const showSwal = (id) => {
    Swal.fire({
      title: "Tem certeza que quer excluir esse arquivo?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--theme-blue)",
      cancelButtonColor: "var(--theme-red)",
      confirmButtonText: "Sim, quero excluir!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:9000/departamentos/${id}`);
          Swal.fire({
            title: "Registro excluido!",
            text: "O registro foi excluído com sucesso.",
            icon: "success"
          });
          setDepartamentos(prevDepartamentos => prevDepartamentos.filter(dep => dep.departament_id !== id));
        }

        catch (err) {
          Swal.fire({
            title: "Erro!",
            text: "Ocorreu um erro ao excluir o registro.",
            icon: "error"
          });
        }
      };
    });
  };

  return (
    <>
      <section id='registros'>
        <h1 className='mb-5'>DEPARTAMENTO ATUAL</h1>
        <div className='breadcrumb'>
          <h6><a href="/inicio" title='Início'> <VscHome /> Home</a></h6>
          <span> <VscChevronRight /> </span>
          <h6 className='active' title='Departamentos'>Departamentos</h6>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>
                ) : (
                  <>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {departamentos.length === 0 ? (
                      <div className="alert alert-info">Não há registros para exibir.</div>
                    ) : (
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col" className='text-center'>Qnt. Usuários</th>
                            <th scope="col" className='text-center'>Qnt. Máxima</th>
                            <th scope="col" className='text-center'>Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {departamentos.map(departamento => (
                            <tr key={departamento.departament_id}>

                              <td>{departamento.departament_name}</td>
                              <td>{departamento.departament_response}</td>
                              <td className='text-center'>X</td>
                              <td className='text-center'>{departamento.departament_quant}</td>
                              <td className='d-flex justify-content-evenly'>
                                <Link to={`/visualizar-departamento/${departamento.departament_id}`}><VscEye /></Link>
                                <a href="#" className='text-danger' title='Excluir registro' onClick={(e) => {
                                        e.preventDefault();
                                        showSwal(departamento.departament_id);
                                    }}><VscClose /></a>

                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
                <div className='text-end mt-3'>
                  <Link to={'/adicionar-departamento'}><button type='button' className="btn btn-success"><VscAdd /> Adicionar novo departamento</button></Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Departamentos 