import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VscChevronRight, VscHome, VscAccount } from "react-icons/vsc";


import '../Departamentos/VisualizarRegistro.css';
import Swal from 'sweetalert2';

const VisualizarFuncionario = () => {
    const [funcionario, setFuncionario] = useState({
        funcionarios_name: '',
        funcionarios_email: '',
        funcionarios_depart: 0,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();  


    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                const response = await fetch(`http://localhost:9000/funcionarios/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFuncionario(data);
                } else {
                    setError('Funcionario não encontrado.');
                }
            } catch (err) {
                setError('Ocorreu um erro ao carregar os dados.');
            }
        };

        fetchFuncionario();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');  
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFuncionario((prevFuncionario) => ({
            ...prevFuncionario,
            [name]: value
        }));
    };

    const showSwal = () => {
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
                    const deleteResponse = await fetch(`http://localhost:9000/funcionarios/${id}`, {
                        method: 'DELETE',
                    });

                    if (deleteResponse.ok) {
                        Swal.fire({
                            title: "Registro excluído!",
                            text: "O registro foi excluído com sucesso.",
                            icon: "success"
                        }).then(() => {
                            navigate('/funcionarios');
                        });
                    } else {
                        Swal.fire({
                            title: "Erro",
                            text: "Não foi possível excluir o registro.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Erro",
                        text: "Ocorreu um erro ao tentar excluir o registro.",
                        icon: "error"
                    });
                }
            }
        });
    };

    const confirmSwal = () => {
        Swal.fire({
            icon: "success",
            title: "Seu registro foi atualizado",
            showConfirmButton: false,
            timer: 2000
        });
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:9000/funcionarios/${id}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(funcionario),
            });
    
            if (response.ok) {
                confirmSwal();
            } else {
                Swal.fire('Erro', 'Não foi possível atualizar o registro.', 'error');
            }
        } catch (err) {
            Swal.fire('Erro', 'Ocorreu um erro ao atualizar o registro.', 'error');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!funcionario) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <section id='perfil'>
                <h1 className='mb-5'>DEPARTAMENTO ATUAL</h1>
                <div className='breadcrumb'>
                    <h6><a href="/inicio" title='Início'> <VscHome /> Home</a></h6>
                    <span> <VscChevronRight /> </span>
                    <h6><a href="#" onClick={() => navigate(-1)} title='Funcionários'> <VscAccount /> Funcionários</a></h6>
                    <span> <VscChevronRight /> </span>
                    <h6 className='active' title='Perfil'>Perfil</h6>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-2">
                            <form>
                                <div className="card-body">
                                    <div className='dados-perfil'>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <label htmlFor="">Nome do funcionário:
                                                    <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        value={funcionario.funcionarios_name}
                                                        onChange={(e) => setFuncionario({ ...funcionario, funcionarios_name: e.target.value })}
                                                    />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="">E-mail:
                                                    <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        value={funcionario.funcionarios_email}
                                                        onChange={(e) => setFuncionario({ ...funcionario, funcionarios_email: e.target.value })}
                                                    />
                                                </label>
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="">Departamento:
                                                    <input
                                                        type="number"
                                                        className="form-control w-100"
                                                        value={funcionario.funcionarios_depart}
                                                        onChange={(e) => setFuncionario({ ...funcionario, funcionarios_depart: e.target.value })}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3 data-registro">
                                                <p className='bold'>Registro criado em: <span className='text-success'>{formatDate(funcionario.departament_insert)}</span></p>
                                            </div>
                                            <div className="col-md-3 data-atualizacao">
                                                <p className='bold'>Registro atualizado em: <span className='text-warning'>{formatDate(funcionario.departament_update)}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='group-buttons'>
                                        <button type='submit' className="btn btn-lg btn-success" onClick={handleUpdate}>Salvar alterações</button>
                                        <button type='button' className="btn btn-lg btn-danger" onClick={(e) => {
                                            e.preventDefault();
                                            showSwal(funcionario.funcionarios_id);
                                        }}>Excluir registro</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VisualizarFuncionario
