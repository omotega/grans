import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { Itransaction } from '../utils/interface';
import db from './index';


export class Transaction extends Model<Itransaction> {
  declare id: number;
  declare txnType: string;
  declare purpose: string;
  declare amount: number;
  declare accountId: number;
  declare reference: string;
  declare balanceBefore: number;
  declare balanceAfter: number;
  declare metadata: object;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models:any) {
    Transaction.belongsTo(models.Account);
  }
}

Transaction.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  txnType:{
    type: DataTypes.ENUM,
    values:['debit','credit'],
    allowNull:false,
  },
  purpose:{
    type: DataTypes.ENUM,
    values:['deposit','transfer','withdrawal','reversal'],
    allowNull:false,
  },
  amount:{
    type:DataTypes.FLOAT,
    allowNull:false,
  },
  accountId:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  reference:{
    type:DataTypes.UUID,
    defaultValue:UUIDV4,
    unique:true,
  },
  balanceBefore:{
    type:DataTypes.FLOAT,
    allowNull:false,
  },
  balanceAfter:{
    type:DataTypes.FLOAT,
    allowNull:false,
  },
  metadata: {
    type:DataTypes.JSON,
    allowNull:true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'Transactions',
  underscored: false,

})

export default Transaction;