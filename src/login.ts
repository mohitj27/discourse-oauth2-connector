import { Request, Response, Router } from "express";
import { passport } from "./oneauth";

const route = Router();

route.get("/", passport.authenticate("oneauth"));

route.get(
  "/callback",
  passport.authenticate("oneauth", {
    failureRedirect: "/login/fail",
    successReturnToOrRedirect: process.env.DISCOURSE_SITE_URL
  })
);

route.get("/fail", (req, res) => {
  //TODO: Actually inject error flash messages here

  res.status(500).render("error", {
    layout: "head",
    title: "500:Server Error",
    code: 500,
    message:
      "Authentication failed due to some reason. We're working on it. Please try again later."
  });
});

export { route };
