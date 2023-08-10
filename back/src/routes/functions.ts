import { client } from "../utils/db-client";

const handleFunctionError = (err, req, res, next) => {
  res.status(404).send({ message: err.message });
  next();
};

const setFunctionsRoutes = (app) => {
  app.get(
    `/functions/calculate_discount_percentage`,
    async (req, res, next) => {
      try {
        const result = await client.raw(
          `SELECT * FROM calculate_discount_percentage(${req.query.val})`
        );
        res.status(200).send(result.rows[0].calculate_discount_percentage);
      } catch (e) {
        next(e);
      }
    },
    handleFunctionError
  );

  app.get(
    `/functions/calculate_order_total`,
    async (req, res, next) => {
      try {
        const result = await client.raw(
          `SELECT * FROM calculate_order_total(${req.query.goods_id})`
        );
        res.status(200).send(result.rows[0].calculate_order_total);
      } catch (e) {
        next(e);
      }
    },
    handleFunctionError
  );

  app.get(
    `/functions/customer_orders`,
    async (req, res, next) => {
      try {
        const result = await client.raw(
          `SELECT * FROM get_customer_orders(${req.query.customer_id})`
        );
        res.status(200).send(result.rows[0]);
      } catch (e) {
        next(e);
      }
    },
    handleFunctionError
  );
};

export { setFunctionsRoutes };
