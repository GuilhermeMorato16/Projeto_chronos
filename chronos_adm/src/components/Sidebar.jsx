import React from 'react'
import './Sidebar.css';
import { useState } from 'react';
import { VscAccount, VscChromeClose, VscBriefcase } from "react-icons/vsc";
import { Link } from 'react-router-dom';



const Sidebar = () => {
  []

  const [openItem, setOpenItem] = useState(null);

  const toggleNavItemClass = (item) => {
    setOpenItem(openItem === item ? null : item);
  }


  return (
    <>
      <div id='sidebar'>
        <h2><Link to={'/'}> Chronos</Link></h2>
        <ul>
          <li className={`navItem ${openItem === 'departamentos' ? 'aberto' : ''}`}
            onClick={() => toggleNavItemClass('departamentos')}><VscBriefcase /> Departamentos
            <ul>
              <li><Link to={'/departamentos'}>Ver todos</Link></li>
              <li><Link to={'/adicionar-departamento'}>Adicionar departamento</Link></li>
            </ul>
          </li>
          <li className={`navItem ${openItem === 'funcionarios' ? 'aberto' : ''}`}
            onClick={() => toggleNavItemClass('funcionarios')}><VscAccount /> Funcionários
            <ul>
              <li><Link to={'/funcionarios'}>Ver todos</Link></li>
              <li><Link to={'/adicionar-funcionario'}>Adicionar funcionário</Link></li>
            </ul>
          </li>
          <li><a href="/login"><VscChromeClose /> Sair</a></li>
        </ul>
      </div>

      <nav className="navbar fixed-top">
        <div className="container-fluid">
          <h2 className="text-white"><Link to={'/'}> Chronos</Link></h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Chronos</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul>
                <li className={`navItem ${openItem === 'departamentos' ? 'aberto' : ''}`}
                  onClick={() => toggleNavItemClass('departamentos')}><VscBriefcase /> Departamentos
                  <ul>
                    <li><Link to={'/departamentos'}>Ver todos</Link></li>
                    <li><Link to={'/adicionar-departamento'}>Adicionar departamento</Link></li>
                  </ul>
                </li>
                <li className={`navItem ${openItem === 'funcionarios' ? 'aberto' : ''}`}
                  onClick={() => toggleNavItemClass('funcionarios')}><VscAccount /> Funcionários
                  <ul>
                    <li><Link to={'/funcionarios'}>Ver todos</Link></li>
                    <li><Link to={'/adicionar-funcionario'}>Adicionar funcionário</Link></li>
                  </ul>
                </li>
                <li><a href="/login"><VscChromeClose /> Sair</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Sidebar;
