import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import usersRouter from "./api/users/index.js";
import { pictureUploadRouter, pdfDownloadRouter } from "./api/users/files/index.js";
import postsRouter from "./api/posts/index.js";
import router from "./api/experiences/index.js";
import experiencesRouter from "./api/experiences/index.js";
import { badRequestHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js";

import mongoose from "mongoose";
import bodyParser from "body-parser";

const { PORT, MONGO_URL, FE_PROD_URL, FE_DEV_URL } = process.env;
const server = express();

// ************************************** CORS *******************

/* CROSS-ORIGIN RESOURCE SHARING
Cross-Origin Requests:
1. FE=http://localhost:3000 and BE=http://localhost:3001 <-- 2 different port numbers they are 2 different origins
2. FE=https://myfe.com and BE=https://mybe.com <-- 2 different domains they are 2 different origins
3. FE=https://domain.com and BE=http://domain.com <-- 2 different protocols they are 2 different origins
*/

// ***************************************************************

const whitelist = [FE_DEV_URL, FE_PROD_URL];

const corsOpts = {
  origin: (origin, corsNext) => {
    console.log("CURRENT ORIGIN: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      // If current origin is in the whitelist you can move on
      corsNext(null, true);
    } else {
      // If it is not --> error
      corsNext(createHttpError(400, `Origin ${origin} is not in the whitelist!`));
    }
  },
};

server.use(cors(corsOpts));

server.use(bodyParser.json())

server.use(express.json());
server.use("/users", usersRouter);
server.use("/users", pictureUploadRouter);
server.use("/users", pdfDownloadRouter);
server.use("/users", router);
server.use("/posts", postsRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

mongoose.connect(MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(PORT, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${PORT}`);
  });
});
