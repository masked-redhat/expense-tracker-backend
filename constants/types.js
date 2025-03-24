const STR_REQ = { type: String, required: true };

const UNIQUE_STR_REQ = { type: String, required: true, unique: true };

const NUM_REQ = { type: Number, required: true };

const INDEXED = (type) => ({ ...type, index: true });

const types = {
  STR_REQ,
  UNIQUE_STR_REQ,
  NUM_REQ,
  INDEXED,
  STRING: String,
  NUMBER: Number,
};

export default types;
