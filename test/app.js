// @ts-check
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerGenerator = require("../index");

async function startup() {
  // App init
  const app = express();
  app.set("json spaces", 2);

  // swagger setting
  // @ts-ignore
  const definition = {
    info: {
      title: "Fronter",
      description: "Backend Api Document",
      version: "0.0.1",
    },
    basePath: "/api",
    securityDefinitions: [],
  };
  const specs = swaggerGenerator({
    swaggerDefinition: definition,
    basedir: __dirname,
    files: ["./router.js"],
    securityDefinitions: {},
  });

  // @ts-ignore
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App listening on port ${port}!`);
}
startup();
