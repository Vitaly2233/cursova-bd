import express from "express";
import cors from "cors";
import  bodyParser from "body-parser";
import { setCreateRoutes } from "./src/routes/create";
import { setGetRoutes } from "./src/routes/get";
import { setPatchRoutes } from "./src/routes/patch";
import { setDeleteRoutes } from "./src/routes/delete";
import { setFunctionsRoutes } from "./src/routes/functions";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

setCreateRoutes(app);
setGetRoutes(app);
setPatchRoutes(app);
setDeleteRoutes(app);
setFunctionsRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
