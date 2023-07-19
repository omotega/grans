import db from "../dbconnection";

async function createAccount(data: any) {
  return db.account.create({ data });
}

async function findAccountById(id: string) {
  return db.account.findUnique({ where: { id: id } });
}

async function accountBalanceIncrement(amount: number, id: string) {
  return db.account.update({
    where: { id: id },
    data: {
      balance: {
        increment: amount,
      },
    },
  });
}

async function accountBalanceDecrement(amount: number, id: string) {
  return db.account.update({
    where: { id: id },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });
}

export default {
  createAccount,
  findAccountById,
  accountBalanceIncrement,
  accountBalanceDecrement,
};
