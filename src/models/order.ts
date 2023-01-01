import { Model, DataTypes, } from 'sequelize'
import { Iorder } from '../utils/interface';
import db from './index';

class Order extends Model<Iorder> {
  declare id: number;
  declare owner: string;
  declare item: string;
  declare totalAmount: number;
  declare paidAmount: number;
  declare canceledAt:number;
  declare orderDate: Date;
  declare orderStatus: string;
  declare remark: string
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  item:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  totalAmount:{
    type:DataTypes.FLOAT,
    allowNull: false,
  },
  paidAmount:{
    type:DataTypes.FLOAT,
    allowNull: false,
  },
  canceledAt:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  orderDate:{
    type:DataTypes.DATE,
    allowNull: false,
  },
  orderStatus:{
    type:DataTypes.ENUM,
    values:['pending','confirmed'],
    defaultValue: 'pending',
    allowNull:false,
  },
  remark:{
    type:DataTypes.STRING,
  }

}, {
  sequelize: db,
  tableName: 'Orders',
  underscored: false,
})

export default Order;