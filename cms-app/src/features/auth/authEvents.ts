export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

export function dispatchUnauthorized() {
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
}
