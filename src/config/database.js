import 'dotenv/config';
import { Sequelize } from "sequelize";


// configura o banco de dados usado
const sequelize = new Sequelize(
    process.env.DB_NAME || 'locadora',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
        port: process.env.DB_PORT || 3306,
        define: {
            timestamps: false
        },
        logging: console.log
    }
);
sequelize.authenticate().catch((error) => {
    console.error('Não é possível conectar-se ao banco de dados: ', error);
});


export default sequelize;