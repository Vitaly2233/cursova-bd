import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useEffect } from "react";
import EditEntityModal from "../components/EditEntityModal";
import List from "../components/List";
import { useStore } from "../store";
import AddEntityModal from "../components/AddEntityModal";
import { entityFieldsByType } from "../utils/entity-fields-by-type";
import { entityViews } from "../utils/entity-views";
import { entityNames } from "../utils/entity-names";
import { debounce } from "../utils/debounce";
import DiscountPercentage from "../components/DiscountPercentage";
import CustomerOrders from "../components/CustomerOrders";

function Home() {
  const { entityStore } = useStore();

  const handleGetOrderTotalClick = async (id: number) => {
    console.log("🚀 ~ file: Home.tsx:18 ~ handleGetOrderTotalClick ~ id:", id);
    const res = await entityStore.calculateOrderTotal(id);
    alert(res);
  };

  const handleEditEntity = async (
    modifiedEntity?: Record<string, string> | null
  ) => {
    await entityStore.patchEntity(modifiedEntity);
  };

  const handleAddEntity = async (newEntity?: Record<string, string>) => {
    await entityStore.postEntity(newEntity);
  };

  const handleSearchChange = debounce(async (search: string, type: string) => {
    const res = await entityStore.getApiEntities(type, search);
    entityStore.setEntitiesByType(type, res.data);
  }, 500);

  const init = async () => {
    await entityStore.setAll();
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {entityStore.editEntityType ? (
        <EditEntityModal
          handleOrderTotalClick={handleGetOrderTotalClick}
          handleEditEntity={handleEditEntity}
          type={entityStore.editEntityType}
          item={toJS(entityStore?.editEntityItem)}
        />
      ) : null}
      {entityStore.newItemType ? (
        <AddEntityModal
          fieldsToFill={entityFieldsByType(entityStore.newItemType)}
          handleAddEntity={handleAddEntity}
          isOpen={!!entityStore.newItemType}
        />
      ) : null}
      {entityNames.map((type) => (
        <List
          type={type}
          onSearchChange={handleSearchChange}
          items={entityStore.getEntitiesByType(type) as any}
        />
      ))}
      <h1 style={{ textAlign: "center" }}>VIEWS</h1>
      {entityViews.map((view) => (
        <List
          type={view}
          onSearchChange={handleSearchChange}
          items={entityStore.getEntitiesByType(view) as any}
        />
      ))}
      <h1 style={{ textAlign: "center" }}>Functions</h1>
      <DiscountPercentage />
      <CustomerOrders />
    </div>
  );
}

export default observer(Home);
