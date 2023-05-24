import { client } from "../utils/db-client";

const entityRouteNames = [
  "order",
  "comment",
  "consultant",
  "customer",
  "goods",
];

const handleDeleteError = (err, req, res, next) => {
  res.status(405).send({ message: err.message });
  next();
};

const setDeleteRoutes = (app) => {
  for (const routeName of entityRouteNames) {
    app.delete(
      `/${routeName}/:id`,
      async (req, res, next) => {
        const id = req.params.id;
        try {
          await client(routeName).where({ id }).delete();
          
          res.status(200).send();
        } catch (e) {
          next(e);
        }
      },
      handleDeleteError
    );
  }
};

export { setDeleteRoutes };
