import { Model, DataTypes } from "sequelize";
import { Iuser } from "../utils/interface";
import db from './index';
import Otp from './otp';
import Account from './account';

class User extends Model<Iuser> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare active: boolean;
  declare phone: string;

}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  photo: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  tableName: "Users",
  underscored: false,
});

User.hasMany(Otp,{
  as:'Otps',
  foreignKey:"email",
  onDelete:"cascade",
})

// User.hasOne(Account,{
//   sourceKey:'id',
//   foreignKey:'wallet_id',
//   as:'User'
// })

export default User;