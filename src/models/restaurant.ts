import { DataTypes, Model } from 'sequelize';
import db from './index'
import { Irestaurant } from '../utils/interface';

class Restaurant extends Model<Irestaurant> {
  declare id: number;
  declare name: string;
  declare state: string;
  declare city: string;
  declare address: string;
  declare description: string;
  declare isOpen: boolean;
}

Restaurant.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isOpen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
},{
  sequelize: db,
  tableName: 'Restaurant',
  underscored: false,
})


export default Restaurant;