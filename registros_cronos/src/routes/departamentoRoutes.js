const express = require('express');
const { listDeparts, criarDepartamento, editarDepartamento, removerDepartamento } = require('../controllers/departsController');
const router = express.Router();

router.get('/', async (req, res) => {
    const response = await listDeparts();
    res.send(response);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const response = await listDeparts(id);
        
        if (response.length > 0) {
            res.json(response[0]); 
        } else {
            res.status(404).json({ message: 'Departamento não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o departamento.', error: error.message });
    }
});
router.post('/', async (req, res) => {
    const dados = req.body;  
    const response = await criarDepartamento(dados);  
    res.send(response);
});
router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const dados = req.body;  
    const response = await editarDepartamento(dados, id);  
    res.send(response);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await removerDepartamento(id);  
    res.send(response);
});

module.exports = router;