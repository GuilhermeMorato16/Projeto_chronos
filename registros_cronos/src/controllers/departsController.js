const { execute } = require("../database");
const tabela = 'departamentos';


async function listDeparts(){
    try {
        return await execute(`SELECT * FROM ${tabela}`)
    } catch (error) {
        return {
            type: 'error',
            message: 'Ocorreu um erro ao carragar os dados'
        }
    }
}
async function criarDepartamento(dados){
    try {
        if(dados.departament_name == null || dados.departament_name == ''){
            throw new Error('O campo nome é obrigatorio')
        }
        if(dados.departament_response == null || dados.departament_response == ''){
            throw new Error('O campo email é obrigatorio')
        }
        if(dados.departament_quant == null || dados.departament_quant == ''){
            throw new Error('O campo departamento é obrigatorio')
        }

        
        const request = await execute(`INSERT INTO ${tabela} (departament_name, departament_response, departament_quant) VALUES ('${dados.departament_name}', '${dados.departament_response}', '${dados.departament_quant}');`) 

        if(request.affectedRows > 0){
            return {
                type: 'success',
                message: 'Cadastro feito com sucesso!'
            }
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'Ocorreu um erro ao criar o registro'
        }
    }
}
async function editarDepartamento(dados, id){
    try {
        if(!dados.departament_name || !dados.departament_response || !dados.departament_quant){
            throw new Error('Todos os campos são obrigatórios')
        }

        
        const request = await execute(`UPDATE ${tabela}
        SET departament_name = '${dados.departament_name}',
            departament_response = '${dados.departament_response}',
            departament_quant = '${dados.departament_quant}'
        WHERE departament_id = ${id};`) 

        if(request.affectedRows > 0){
            return {
                type: 'success',
                message: 'Cadastro atualizado com sucesso!'
            }
        };
    } catch (error) {
        return {
            type: 'error',
            message: `Ocorreu um erro ao editar o registro: ${error.message}`
        }
    }
}
async function removerDepartamento(id){
    try {
        const result = await execute(`DELETE FROM ${tabela} WHERE departament_id = ${id}`);

        if (result.affectedRows > 0) {
            return {
                type: 'success',
                message: 'Departamento excluído com sucesso!'
            };
        } else {
            return {
                type: 'warning',
                message: 'Nenhum departamento foi encontrado para excluir.'
            };
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'Ocorreu um erro ao remover o registro'
        }
    }
}

module.exports = { listDeparts, criarDepartamento, editarDepartamento, removerDepartamento };