import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { VscChevronRight, VscHome, VscBriefcase } from "react-icons/vsc";

import Swal from 'sweetalert2';

const AdicionarDepartamento = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [swalShown, setSwalShown] = useState(false)

  const handleChange = (event) => {
    const value = event.target.value;
    if (value <= 20) {
      setQuantidade(value);
    }
  };

  const adicionarDepartamento = async (dados) => {
    try {
      const response = await fetch('http://localhost:9000/departamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Departamento adicionado!',
          text: 'O novo departamento foi adicionado com sucesso.',
        });
        navigate('/departamentos'); // Redireciona para a lista de departamentos após a adição
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao adicionar departamento',
          text: 'Ocorreu um erro ao adicionar o departamento.',
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
        <h1 className='mb-5'>DEPARTAMENTO ATUAL</h1>
        <div className='breadcrumb'>
          <h6><a href="/inicio" title='Início'> <VscHome /> Home</a></h6>
          <span> <VscChevronRight /> </span>
          <h6><a href="#" onClick={() => navigate(-1)} title='Departamento'> <VscBriefcase /> Departamento</a></h6>
          <span> <VscChevronRight /> </span>
          <h6 className='active' title='Perfil'>Adicionar novo departamento</h6>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-2">
              <form  onSubmit={handleSubmit(adicionarDepartamento)}>
                <div className="card-body">

                  {/* <div className='perfil-image'>
                            <VscAccount />
                        </div> */}
                  <div className='dados-perfil'>
                    <div className="row">
                      <div className="col-md-5">
                        <label htmlFor="">Nome do departamento:
                          <input type="text" {...register('departament_name', { required: true })} className="form-control w-100" placeholder="Nome" />
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="">Responsável pelo departamento:
                          <input type="text" {...register('departament_response', { required: true })} className="form-control w-100" placeholder="Responsável" />
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="">Quantidade máxima de funcionários:
                          <input type="number" onChange={handleChange} {...register('departament_quant', { required: true })} className="form-control w-100" placeholder="Máximo 20 funcionários" maxLength='2' />
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

export default AdicionarDepartamento;
