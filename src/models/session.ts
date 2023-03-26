import { DataTypes, Model, UUIDV4 } from "sequelize";
import { Isession } from "../utils/interface";
import db from "./index";

class Session extends Model<Isession> {
  declare user: number;
  declare valid: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models:any) {
    Session.belongsTo(models.Users);
  }

}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      primaryKey: true,
      unique: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Sessions",
    underscored: false,
  }
);

export default Session;
