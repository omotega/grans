import { Model, DataTypes } from 'sequelize'
import { Ifood, Iuser } from '../utils/interface'
import db from './index';


class Food extends Model<Ifood> {
  declare id: number;
  declare price: number;
  declare foodType: string;
  declare description: string;
  declare vendor :Iuser
}

Food.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  price:{
    type:DataTypes.FLOAT, 
    allowNull:false,
  },
  foodType:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  description:{
    type:DataTypes.STRING,
    allowNull:true
  },
  vendor:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  }

}, {
  sequelize: db,
  tableName: 'Foods',
  underscored: false,
})

export default Food;