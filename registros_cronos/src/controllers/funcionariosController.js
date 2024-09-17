const { execute } = require("../database");
const tabela = 'funcionarios';


async function listFuncionario(){
    try {
        return await execute(`SELECT * FROM ${tabela}`)
    } catch (error) {
        return {
            type: 'error',
            message: 'Ocorreu um erro ao carragar os dados'
        }
    }
}
async function criarFuncionario(dados){
    try {
        if(dados.funcionarios_name == null || dados.funcionarios_name == ''){
            throw new Error('O campo nome é obrigatorio')
        }
        if(dados.funcionarios_email == null || dados.funcionarios_email == ''){
            throw new Error('O campo email é obrigatorio')
        }
        if(dados.funcionarios_depart == null || dados.funcionarios_depart == ''){
            throw new Error('O campo departamento é obrigatorio')
        }

        
        const request = await execute(`INSERT INTO ${tabela} (funcionarios_name, funcionarios_email, funcionarios_depart) VALUES ('${dados.funcionarios_name}', '${dados.funcionarios_email}', '${dados.funcionarios_depart}');`) 

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
async function editarFuncionario(dados, id){
    try {
        if(!dados.funcionarios_name || !dados.funcionarios_email || !dados.funcionarios_depart){
            throw new Error('Todos os campos são obrigatórios')
        }

        
        const request = await execute(`UPDATE ${tabela}
        SET funcionarios_name = '${dados.funcionarios_name}',
            funcionarios_email = '${dados.funcionarios_email}',
            funcionarios_depart = '${dados.funcionarios_depart}'
        WHERE funcionarios_id = ${id};`) 

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
async function removerFuncionario(id){
    try {
        const result = await execute(`DELETE FROM ${tabela} WHERE funcionarios_id = ${id}`);

        if (result.affectedRows > 0) {
            return {
                type: 'success',
                message: 'Funcionario excluído com sucesso!'
            };
        } else {
            return {
                type: 'warning',
                message: 'Nenhum Funcionario foi encontrado para excluir.'
            };
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'Ocorreu um erro ao remover o registro'
        }
    }
}

module.exports = { listFuncionario, criarFuncionario, editarFuncionario, removerFuncionario };