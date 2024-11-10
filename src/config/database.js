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
        logging: false
    }
);
sequelize.authenticate().catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


export default sequelize;