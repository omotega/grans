import { Model, DataTypes } from "sequelize";
import { Iuser } from "../utils/interface";
import db from './index';
import Otp from './otp';


class User extends Model<Iuser> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare active: boolean;
  declare verified: boolean;
  declare phone: string;
  declare role:string;

  static associate (models:any) {
    User.hasOne(models.Otps,{
      foreignKey:'email',
    });
    User.hasOne(models.Accounts,{
      sourceKey: 'id',
      foreignKey:'accountId',
    });
  }

}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
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
    defaultValue: true,
  },
  verified:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  photo: {
    type: DataTypes.STRING,
  },
  role:{
    type:DataTypes.ENUM,
    values:['admin','vendor','user'],
    defaultValue:'user',
  },

}, {
  sequelize: db,
  tableName: "Users",
  underscored: false,
});

export default User;