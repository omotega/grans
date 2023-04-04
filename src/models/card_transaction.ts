import { DataTypes, Model, UUIDV4 } from "sequelize";
import { IcardTransaction } from "../utils/interface";
import db from "./index";

class CardTransaction extends Model<IcardTransaction> {
  declare id: number;
  declare externalReference: string;
  declare accountId: number;
  declare amount: number;
  declare lastResponse: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CardTransaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    externalReference: {
      type: DataTypes.STRING,
      unique: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lastResponse: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: "CardTransactions",
    underscored: false,
  }
);

export default CardTransaction;
