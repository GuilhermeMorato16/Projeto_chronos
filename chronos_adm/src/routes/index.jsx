import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import PageBlank from '../layouts/Pageblank';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ErrorPage from '../pages/NotFound';
import Departamentos from '../pages/Departamentos/Departamentos';
import VisualizarDepartamento from '../pages/Departamentos/VisualizarDepartamento';
import AdicionarDepartamento from '../pages/Departamentos/AdicionarDepartamento';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Funcionarios from '../pages/Funcionarios/Funcionarios';
import AdicionarFuncionario from '../pages/Funcionarios/AdicionarFuncionario';
import VisualizarFuncionario from '../pages/Funcionarios/VisualizarFuncionario';

export const Paths = () => {
  const { isLogged } = useContext(AuthContext)

  return (
    <>
      <BrowserRouter>
        <Routes>
            {isLogged &&
            <Route path={'/'} element={<PageBlank />}>
                <Route index element={<Home />}/>
                {/* DEPARTAMENTOS */}
                <Route path={'/departamentos'} element={<Departamentos />}/>
                <Route path={'/visualizar-departamento/:id'} element={<VisualizarDepartamento />}/>
                <Route path={'/adicionar-departamento'} element={<AdicionarDepartamento />}/>
                {/* DEPARTAMENTOS */}
                <Route path={'/funcionarios'} element={<Funcionarios />}/>
                <Route path={'/visualizar-funcionario/:id'} element={<VisualizarFuncionario />}/>
                <Route path={'/adicionar-funcionario'} element={<AdicionarFuncionario />}/>
            </Route>
           } 
            <Route path={'/login'} element={<Login />}/>
            <Route path={'*'} element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}