import mongoose from "mongoose";

class Transaction {
  constructor() {
    this.session = null;
  }

  transaction = async () => {
    this.session = await mongoose.startSession();
    this.session.startTransaction();
  };

  commit = async () => {
    await this.session.commitTransaction();
    await this.session.endSession();
  };

  rollback = async () => {
    await this.session.abortTransaction();
    await this.session.endSession();
  };
}

const dbTransaction = async () => {
  const newTransaction = new Transaction();

  await newTransaction.transaction();
  return newTransaction;
};

export default dbTransaction;
