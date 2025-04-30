export interface Token {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  acr: string;
  "allowed-origins": string[];
  realm_access: RealmAccess;
  resource_access: object;
  scope: string;
  sid: string;
  email_verified: boolean;
  roles: string[];
  preferred_username: string;
}

export interface RealmAccess {
  roles: string[];
}

export interface Backend {
  roles: string[];
}

export interface TaskManagement {
  roles: string[];
}

export interface Account {
  roles: string[];
}
