import Keycloak from "keycloak-connect";
import session from "express-session";

const keycloakConfig = {
  "auth-server-url": process.env.AUTH_SERVER_URL || "",
  realm: "Task-Management",
  resource: process.env.CLIENT_ID || "",
  "ssl-required": "external",
  "confidential-port": 0,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "enable-cors": true,
  "client-id": process.env.CLIENT_ID || "",
  "bearer-only": true,
  secret: process.env.SECRET_KEY || "",
  "realm-public-key": process.env.REALM_PUBLIC_KEY || "",
};

const memoryStore = new session.MemoryStore();

// Initialize Keycloak middleware (assuming it's already configured as in the previous example)
const keycloak = new Keycloak(
  {
    store: memoryStore,
  },
  keycloakConfig
);

keycloak.accessDenied = (req: any, res: any) => {
  res.status(403).json({
    message: "Access Denied",
  });
};

console.log("keycloak", keycloak);
export default keycloak;
