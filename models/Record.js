import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

    const Record = sequelize.define('Record', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        higherBlock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userName:{
           type: DataTypes.STRING,
           allowNull: false, 
        },
    });


export default Record;
