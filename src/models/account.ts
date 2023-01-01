import { Model, DataTypes } from 'sequelize'
import { Iaccount } from '../utils/interface'
import db from './index';

class Account extends Model<Iaccount> {
  declare id: number;
  declare userId: number;
  declare balance: number;

  static associate(models:any) {
    Account.belongsTo(models.Users);
  }

}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull:false,
  },
  userId: {
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