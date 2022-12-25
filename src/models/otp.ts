import { DataTypes, Model } from 'sequelize';
import db from './index'


class Otp extends Model {
  declare id: number;
  declare email: string;
  declare token: number;
  declare expired: boolean;

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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expired: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
  }
}, {
  sequelize: db,
  tableName: 'Otps',
  underscored: false,
})

export default Otp;