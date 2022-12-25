import { Model, DataTypes } from 'sequelize'
import { Iaccount } from '../utils/interface'
import db from './index';

class Account extends Model<Iaccount> {
  declare id: number;
  declare wallet_id: string;
  declare user_id: number;
  declare balance: number;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  wallet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,

  }
}, {
  sequelize: db,
  tableName: 'Accounts',
  underscored: false,
})

export default Account