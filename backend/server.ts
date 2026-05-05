import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./src/routes/users.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { elementRouter } from "./src/routes/elements.routes.js";
import handleServerErrors from "./src/middlewares/handleServerErrors.js";
import { handleUserErrors } from "./src/middlewares/handleUserErrors.js";
import { blockRouter } from "./src/routes/blocks.routes.js";
import { groupRouter } from "./src/routes/groups.routes.js";
import { periodRouter } from "./src/routes/periods.routes.js";

// INIT
const PORT = Number(process.env.PORT ?? 3000);
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ROUTES
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/elements", elementRouter);
app.use("/blocks", blockRouter);
app.use("/groups", groupRouter);
app.use("/periods", periodRouter);

// SPECIFIC ROUTES ERROR HANDLING
app.use(handleUserErrors);

// GLOBAL ERROR HANDLING
app.use(handleServerErrors);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
