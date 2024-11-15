import 'dotenv/config';
import { Sequelize } from "sequelize";


// configura o banco de dados usado
const sequelize = new Sequelize(
    'locadora',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
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