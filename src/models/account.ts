import { Model, DataTypes } from 'sequelize'
import { Iaccount } from '../utils/interface'
import db from './index';


class Account extends Model<Iaccount> {
  declare id: number;
  declare userId: number;
  declare balance: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  

  static associate(models:any) {
    Account.belongsTo(models.Users);

    Account.hasOne(models.Transaction,{
      sourceKey: 'id',
      foreignKey: 'accountId',  
    }) 
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

  },
  createdAt:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt:{
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize: db,
  tableName: 'Accounts',
  underscored: false,
})

export default Account