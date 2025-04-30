import { Token } from "../interfaces/KeycloakTypes";

export function getUserInfo(req: any): Token {
  return req?.kauth?.grant.access_token.content;
}

export function filterStatusDataByRole(data: any[], token: Token): any[] {
  const { roles } = token;
  if (roles.includes("backend.admin")) {
    return data;
  } else if (roles.includes("backend.employee")) {
    return data.filter(
      (d) => d.description !== "Cancelled" && d.description !== "Closed"
    );
  }
  return [];
}

export function hasAdminOrManagerRole(token: any, request: any) {
  return token.hasRole("backend.admin") || token.hasRole("backend.manager");
}
