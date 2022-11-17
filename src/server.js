import express from "express";
import cors from "cors";
import usersRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.router.js";
import companies from "./routers/companies.router.js";
import events from "./routers/events.router.js";
import discounts from "./routers/discounts.router.js";

const server = express();

// Middlewares located below
server.use(express.json());
server.use(cors());

// Routers located below
server.get("/", (request, response) => {
  response.json({
    version: "1.1.0",
  });
});
server.use("/users", usersRouter);
server.use("/login", authRouter);
server.use("/company", companies);
server.use("/events", events);
server.use("/discounts", discounts);

// handleError located below

export { server };
