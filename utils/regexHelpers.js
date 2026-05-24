export const regexPatterns = {
  ipAddress:
    /\b\d{1,3}(\.\d{1,3}){3}\b/,

  email:
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  httpProtocol:
    /^http:\/\//i,

  suspiciousCharacters:
    /[0-9]{1,}[a-zA-Z]+/,

  url:
    /(https?:\/\/[^\s]+)/gi
};