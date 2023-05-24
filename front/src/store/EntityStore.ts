import { action, makeAutoObservable, observable } from "mobx";
import axios from "axios";
import { IComment } from "../entities/Comment";
import { IConsultant } from "../entities/Consultant";
import { ICustomer } from "../entities/Customer";
import { IGoods } from "../entities/Goods";
import { IOrder } from "../entities/Order";
import { ICommentDetail } from "../entities/CommentDetail";
import { IOrderDetail } from "../entities/OrderDetail";
import { entityTypeToRouteName } from "../utils/entity-type-to-route-name";
import { entityNames } from "../utils/entity-names";
import { entityViews } from "../utils/entity-views";

class EntityStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable orders: IOrder[] = [];
  @observable goods: IGoods[] = [];
  @observable customers: ICustomer[] = [];
  @observable consultants: IConsultant[] = [];
  @observable comments: IComment[] = [];
  @observable commentDetails: ICommentDetail[] = [];
  @observable orderDetails: IOrderDetail[] = [];

  @observable editEntityItem: Record<string, string> | null = null;
  @observable editEntityType: string | null = null;

  @observable newItemType: string | null = null;

  @action setEntitiesByType = (type: string, newItems: any[]) => {
    //@ts-ignore
    this[type] = newItems;
  };

  getEntitiesByType = (type: string): Record<string, string>[] => {
    //@ts-ignore
    return this[type];
  };

  @action setEntity = (
    newEntity: Record<string, string>,
    index: number,
    type: string
  ) => {
    //@ts-ignore
    this[type][index] = newEntity;
  };

  @action addEntity = (newEntity: Record<string, string>, type: string) => {
    //@ts-ignore
    if (this[type]) this[type].push(newEntity);
  };

  @action setEditEntity = (
    entity: Record<string, string> | null,
    type: string | null
  ) => {
    this.editEntityItem = entity;
    this.editEntityType = type;
  };

  @action setAddEntity = (type: string) => {
    this.newItemType = type;
  };

  @action setAll = async () => {
    [
      this.comments,
      this.consultants,
      this.customers,
      this.goods,
      this.orders,
      this.commentDetails,
      this.orderDetails,
    ] = (
      await Promise.all(
        entityNames.concat(entityViews).map((val) => this.getApiEntities(val))
      )
    ).map((val) => val.data);
  };

  @action postEntity = async (newEntity?: any) => {
    if (newEntity && this.newItemType) {
      const route = `http://localhost:3001/${entityTypeToRouteName(
        this.newItemType
      )}`;
      try {
        const res = await axios.post(route, newEntity);
        this.addEntity(res.data, this.newItemType);
      } catch (e: any) {
        alert(e.response.data.message);
      }
    }
    this.newItemType = null;
  };

  getApiEntities = (entityType: string, search?: string) => {
    const routeName = `http://localhost:3001/${entityTypeToRouteName(
      entityType
    )}`;
    const params: any = {};
    if (search) params.search = search;
    return axios.get<any>(routeName, { params });
  };

  @action patchEntity = async (modifiedEntity?: any) => {
    if (this.editEntityType && modifiedEntity) {
      try {
        await axios.patch(
          `http://localhost:3001/${entityTypeToRouteName(
            this.editEntityType
          )}/${modifiedEntity.id}`,
          modifiedEntity
        );

        const index = this.getEntitiesByType(this.editEntityType).findIndex(
          (entity) => entity.id === modifiedEntity.id
        );
        this.setEntity(modifiedEntity, index, this.editEntityType);
      } catch (e: any) {
        alert(e.response.data.message);
      }
    }

    this.editEntityItem = null;
    this.editEntityType = null;
  };

  @action deleteEntity = async (type: string, id: number) => {
    const entities = this.getEntitiesByType(type);
    const newEntities = entities.filter(
      (item) => item.id.toString() !== id.toString()
    );

    try {
      await axios.delete(
        `http://localhost:3001/${entityTypeToRouteName(type)}/${id}`
      );
    } catch (e: any) {
      alert(e.response.data.message);
    }
    this.setEntitiesByType(type, newEntities);
  };

  getDiscountPercentage = async (sum: number) => {
    const res = await axios.get(
      `http://localhost:3001/functions/calculate_discount_percentage?val=${sum}`
    );
    return res.data;
  };

  calculateOrderTotal = async (goodsId: number) => {
    const res = await axios.get(
      `http://localhost:3001/functions/calculate_order_total?goods_id=${goodsId}`
    );
    return res.data;
  };

  getCustomerOrders = async (customerId: number) => {
    const res = await axios.get(
      `http://localhost:3001/functions/customer_orders?customer_id=${customerId}`
    );
    return res.data;
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EntityStore();
