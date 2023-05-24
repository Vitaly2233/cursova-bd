import { client } from "../utils/db-client";

const entityRouteNames = [
  "order",
  "comment",
  "consultant",
  "customer",
  "goods",
];

const handleCreateError = (err, req, res, next) => {
  res.status(405).send({ message: err.message });
  next();
};

const setCreateRoutes = (app) => {
  for (const routeName of entityRouteNames) {
    app.post(
      `/${routeName}`,
      async (req, res, next) => {
        try {
          const [result] = await client(routeName)
            .insert(req.body)
            .returning("*");
          res.send(result);
        } catch (e) {
          next(e);
        }
      },
      handleCreateError
    );
  }
};

export { setCreateRoutes };
