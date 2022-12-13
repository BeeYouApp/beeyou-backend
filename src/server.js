import express from "express";
import cors from "cors";
import usersRouter from "./routers/users.router.js";
import authRouter from "./routers/auth.router.js";
import companies from "./routers/companies.router.js";
import events from "./routers/events.router.js";
import discounts from "./routers/discounts.router.js";
import rankings from "./routers/rankings.router.js";

const server = express();

// Middlewares located below
server.use(express.json());
server.use(cors());

// Routers located below
server.get("/", (request, response) => {
  response.json({
    version: "2.1.0",
    mensagge: "Access Denied"
  });
});
server.use("/user", usersRouter);
server.use("/login", authRouter);
server.use("/company", companies);
server.use("/events", events);
server.use("/discounts", discounts);
server.use("/rankings", rankings)

export { server };
