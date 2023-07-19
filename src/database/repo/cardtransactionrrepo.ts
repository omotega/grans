import db from "../dbconnection";

async function createCardtransaction(data: any) {
  return db.cardTransaction.create({ data });
}

async function updateCardtransactionByReference(
  reference: string,
  input: string,
) {
  return db.cardTransaction.update({
    where: { externalReference: reference, },
    data: { lastResponse: input },
  });
}

export default {
  createCardtransaction,
  updateCardtransactionByReference
};
