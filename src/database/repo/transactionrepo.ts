import db from "../dbconnection";

async function createTransaction(data: any) {
  return db.transaction.create({ data });
}

export default {
  createTransaction,
};
