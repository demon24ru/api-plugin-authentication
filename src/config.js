import envalid from "envalid";

const { str, bool } = envalid;

export default envalid.cleanEnv(
  process.env,
  {
    OAUTH2_ADMIN_URL: str({ default: "http://s.clubnika.me:4445" }),
    MOCK_TLS_TERMINATION: bool({ default: false })
  },
  {
    dotEnvPath: null
  }
);
