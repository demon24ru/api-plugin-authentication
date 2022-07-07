import envalid from "envalid";

const { str, bool } = envalid;

export default envalid.cleanEnv(
  process.env,
  {
    OAUTH2_ADMIN_URL: str({ default: "http://s.clubnika.me:4445" }),
    MOCK_TLS_TERMINATION: bool({ default: false }),
    MONGO_URL: str({
      devDefault: "mongodb://localhost:27017/reaction",
      desc: "A valid MongoDB connection string URI, ending with the database name",
      example: "mongodb://localhost:27017/reaction"
    })
  },
  {
    dotEnvPath: null
  }
);
