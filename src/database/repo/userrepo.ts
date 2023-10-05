import { emit } from "process";
import { Iuser } from "../../types/user";
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

async function findUserByPhoneAndEmail(payload: {
  phone: string;
  email: string;
}) {
  const { phone, email } = payload;
  return db.user.findUnique({ where: { phoneNumber: phone, email: email } });
}

async function updateField(payload: { userId: string; name: string }) {
  const { userId, name } = payload;
  return db.user.update({
    where: { id: userId },
    data: { name: name },
  });
}

async function updateUserStatus(payload: { userId: string; status: false }) {
  const { userId, status } = payload;
  return db.user.update({
    where: { id: userId },
    data: { verified: status },
  });
}

export default {
  findUserByEmail,
  createUser,
  findUserById,
  findUserByRole,
  updateField,
  findUserByPhoneAndEmail,
  updateUserStatus,
};
