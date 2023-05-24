import { client } from "../utils/db-client";
import { routeToColumnSearch } from "../utils/route-to-column-search";

const entityRouteNames = [
  "order",
  "comment",
  "consultant",
  "customer",
  "goods",
  "comment/details",
  "order/details",
];

const setGetRoutes = (app) => {
  for (const routeName of entityRouteNames) {
    app.get(`/${routeName}`, async (req, res) => {
      const search = req.query?.search;

      const table = routeName.includes("details")
        ? client(routeName.replace("/", "_"))
        : client(routeName).orderBy("id");

      table.select("*");

      if (search) {
        const columnNames: string[] = routeToColumnSearch(routeName);
        for (let i = 0; i < columnNames.length; i++) {
          const column = columnNames[i];

          if (i === 0) table.where(column, "like", `%${search}%`);
          else table.orWhere(column, "like", `%${search}%`);
        }
      }

      res.send(await table);
    });
  }
};

export { setGetRoutes };
