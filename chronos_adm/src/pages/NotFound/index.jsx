import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>Página não encontrada</h1>
      <Link to={'/'}>Voltar</Link>
    </div>
  )
}

export default ErrorPage;
