import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { VscChevronRight, VscHome, VscAccount } from "react-icons/vsc";

import Swal from 'sweetalert2';

const AdicionarFuncionario = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [swalShown, setSwalShown] = useState(false)

  const handleChange = (event) => {
    const value = event.target.value;
    if (value <= 20) {
      setQuantidade(value);
    }
  };

  const criarFuncionario = async (dados) => {
    try {
      const response = await fetch('http://localhost:9000/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Funcionario adicionado!',
          text: 'O novo registro foi adicionado com sucesso.',
        });
        navigate('/funcionarios');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao adicionar o funcionário',
          text: 'Ocorreu um erro ao adicionar o Funcionário.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao comunicar com o servidor.',
      });
    }
  };

  return (
    <>
      <section id='perfil'>
        <h1 className='mb-5'>Funcionários</h1>
        <div className='breadcrumb'>
          <h6><a href="/inicio" title='Início'> <VscHome /> Home</a></h6>
          <span> <VscChevronRight /> </span>
          <h6><a href="#" onClick={() => navigate(-1)} title='Funcionários'> <VscAccount /> Funcionarios</a></h6>
          <span> <VscChevronRight /> </span>
          <h6 className='active' title='Perfil'>Adicionar novo funcionário</h6>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-2">
              <form  onSubmit={handleSubmit(criarFuncionario)}>
                <div className="card-body">
                  <div className='dados-perfil'>
                    <div className="row">
                      <div className="col-md-5">
                        <label htmlFor="">Nome do Funcionário:
                          <input type="text" {...register('funcionarios_name', { required: true })} className="form-control w-100" placeholder="Nome" />
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="">E-mail:
                          <input type="text" {...register('funcionarios_email', { required: true })} className="form-control w-100" placeholder="Responsável" />
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Departamento:
                          <input type="text" onChange={handleChange} {...register('funcionarios_departamento', { required: true })} className="form-control w-100" maxLength='20' />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='group-buttons'>
                    <button type='submit' className="btn btn-lg btn-success">Salvar alterações</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdicionarFuncionario;
