import './Login.css'
import { Link } from 'react-router-dom';
import {useForm } from 'react-hook-form';

const Login = () => {
  function abrirLogin(){
      var bgShape = document.getElementById('bemvindo');
      bgShape.classList.add('fazerLogin')
      
      setTimeout(function() {
        document.getElementById('formLogin').classList.remove('d-none')
        document.getElementById('bgLogin').style.clipPath = ('circle(100% at 50% 50%)')
        bgShape.classList.add('d-none')
        bgShape.classList.remove('col-md-6');
      }, 300);
      setTimeout(function() {
        document.getElementById('formLogin').style.opacity = '100%';
    }, 500);
  }
  const { register, handleSubmit } = useForm()

  function logar(dados){
    console.log(dados)
  }
return (
  <div className='login' id='login'>
    <div className="bg-login" id='bgLogin'></div>
    <div className="container ">
      <div className="row align-items-center justify-content-center">
          <div className="col-md-5 text-center" id='bemvindo'>
              <h1>Bem vindo ao portal Chronos</h1>
              <button onClick={abrirLogin}>Fazer login</button>
          </div>
          <div className="col-md-5 d-none" id="formLogin">
            <h2 className='text-center mb-5'>Chronos</h2>
            <form onSubmit={handleSubmit(logar)}>
              <label htmlFor="">Nome de usuário ou e-mail:
                <input type="text" id='user' {...register('user', {required: true})}/>
              </label>
              <label htmlFor="" className='mt-2'>Senha:
                <input type="text" id='password' {...register('password', {required: true})}/>
              </label> 
              <button type='button' className='mt-4'>
              <Link to={'/'} style={{color: 'white'}}> Acessar portal</Link></button>  
              
            </form>
          </div>
      </div>
    </div>
  </div>
)
}
export default Login
