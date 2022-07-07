import envalid from "envalid";

const { str, bool } = envalid;

export default envalid.cleanEnv(
  process.env,
  {
    STORE_URL: str({ devDefault: "http://localhost:4000" }),
    TOKEN_SECRET: str({ default: "UPDATE_THIS_SECRET" }),
    OAUTH2_ADMIN_URL: str({ default: "http://s.clubnika.me:4445" }),
    MOCK_TLS_TERMINATION: bool({ default: false })
  },
  {
    dotEnvPath: null
  }
);
