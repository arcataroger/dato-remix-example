import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      maxAge: 604_800,
      path: '/',
        sameSite: "none"
    }
  });

export { getSession, commitSession, destroySession };