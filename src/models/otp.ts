import { DataTypes, Model } from 'sequelize';
import db from './index'
import { Iotp } from '../utils/interface';

class Otp extends Model<Iotp> {
  declare id: number;
  declare email: string;
  declare token: string;
  declare expired: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models:any) {
    Otp.belongsTo(models.Users);
  }

}

Otp.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiry_time:{
    type:DataTypes.DATE,
    allowNull:true,
  },
  expired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
  tableName: 'Otps',
  underscored: false,
})

export default Otp;