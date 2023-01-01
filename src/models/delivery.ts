import { DataTypes, Model } from 'sequelize';
import { Idelivery } from '../utils/interface';
import db from './index';

class Delivery extends Model<Idelivery> {
  declare id: number
  declare status: string;
  declare message: string;
}

Delivery.init({
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['pending', 'delivered'],
    defaultValue: 'pending',
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
  }

}, {
  sequelize: db,
  tableName: 'Deliverys',
  underscored: false,
})

export default Delivery;