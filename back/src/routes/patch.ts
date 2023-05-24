import { client } from "../utils/db-client";

const entityRouteNames = [
  "order",
  "comment",
  "consultant",
  "customer",
  "goods",
];

const handlePatchError = (err, req, res, next) => {
  res.status(405).send({ message: err.message });
  next();
};

const setPatchRoutes = (app) => {
  for (const routeName of entityRouteNames) {
    app.patch(
      `/${routeName}/:id`,
      async (req, res, next) => {
        const body = req.body;
        const id = parseInt(req.params?.id);
        if (isNaN(id)) return "invalid id";

        try {
          await client(routeName).update(body).where({ id });
          res.status(200).send();
        } catch (e) {
          next(e);
        }
      },
      handlePatchError
    );
  }
};

export { setPatchRoutes };
