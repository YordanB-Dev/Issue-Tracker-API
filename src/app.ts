import express from "express";
import type {Request, Response} from "express";

import Routes from "./issues/routes.js";


const app = express();

app.use(express.json());

app.use("/api", Routes);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Issue tracker API");
});

export default app;