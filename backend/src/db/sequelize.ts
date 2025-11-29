import { Sequelize } from "sequelize-typescript";
import config from 'config'

import Users from "../models/Users";
import Likes from "../models/Likes";
import Vacations from "../models/Vacations";

const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [Users, Likes, Vacations], 
    logging: console.log
})

export default sequelize