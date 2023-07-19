import db from "../dbconnection";

async function findUserByEmail(email: string) {
  return db.user.findUnique({ where: { email: email } });
}

async function createUser(data: any) {
  return db.user.create({ data });
}

export default {
  findUserByEmail,
  createUser,
};
