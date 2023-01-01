import { Model, DataTypes } from 'sequelize';
import { Icart } from '../utils/interface'
import db from './index';

class Cart extends Model<Icart> {
  declare id: number;
  declare userId: number;
  declare product: number;
  declare bill: number;
}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  product:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  bill:{
    type:DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0,
  }
}, {
  sequelize: db,
  tableName: 'Carts',
  underscored: false,

})

export default Cart;