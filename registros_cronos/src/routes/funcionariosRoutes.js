const express = require('express');
const { listFuncionario, criarFuncionario, editarFuncionario, removerFuncionario } = require('../controllers/funcionariosController');
const router = express.Router();


router.get('/funcionarios', async (req, res) => {
    try {
      const funcionarios = await execute(`
        SELECT funcionarios.funcionarios_id, funcionarios.funcionarios_name, funcionarios.funcionarios_email, departamentos.departament_name 
        FROM funcionarios
        LEFT JOIN departamentos ON funcionarios.departamento_id = departamentos.id
      `);
      res.json(funcionarios);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar funcionários e departamentos' });
    }
  });
router.get('/', async (req, res) => {
    const response = await listFuncionario();
    res.send(response);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const response = await listFuncionario(id);
        
        if (response.length > 0) {
            res.json(response[0]); 
        } else {
            res.status(404).json({ message: 'Funcionario não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o o registro do funcionário.', error: error.message });
    }
});
router.post('/', async (req, res) => {
    const dados = req.body;  
    const response = await criarFuncionario(dados);  
    res.send(response);
});
router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    const response = await editarFuncionario(dados, id); 
    res.send(response);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await removerFuncionario(id); 
    res.send(response);
});

module.exports = router;