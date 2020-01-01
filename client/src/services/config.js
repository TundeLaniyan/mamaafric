export const api =
  window.location.host.startsWith("mamaafric") ||
  window.location.host.startsWith("localhost:7008") ||
  window.location.host.startsWith("127.0.0.1:7008")
    ? "/"
    : "http://localhost:7008/";
