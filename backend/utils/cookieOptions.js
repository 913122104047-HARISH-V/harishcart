const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd, // HTTPS only in production if secure is true, otherwise HTTP (that is secure is false)
    sameSite: isProd ? "none" : "lax",
  };
};

module.exports = getCookieOptions;