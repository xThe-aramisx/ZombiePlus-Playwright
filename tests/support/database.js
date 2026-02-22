const {Pool} = require('pg');

const Dbconfig = {
    user: 'postgres',     // ok
    host: 'localhost',         // ok se o código roda dentro de outro container na mesma rede
                          // se roda na sua máquina local, troque para 'localhost'
    database: 'zombieplus', // ok, já que você criou manualmente
    password: 'pwd123',   // ok
    port: 5432            // ok
}

export async function executeSQL(sqlScript) {
                    // try catch para lidar com erros de conexão ou execução do script
    try {
    const pool = new Pool(Dbconfig)
    const client = await pool.connect()

    const result = await client.query(sqlScript)
    console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    }
}