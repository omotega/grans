import db from "../dbconnection";

async function findUserByEmail(email: string) {
  return db.user.findUnique({ where: { email: email } });
}

async function findUserById(id: string) {
  return db.user.findUnique({ where: { id: id } });
}

async function createUser(data: any) {
  return db.user.create({ data });
}

async function findUserByRole(payload: { userId: string; role: any }) {
  const { userId, role } = payload;
  return db.user.findUnique({ where: { id: userId, role: role } });
}

export default {
  findUserByEmail,
  createUser,
  findUserById,
  findUserByRole,
};
