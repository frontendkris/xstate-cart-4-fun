import React from "react";
import AddProductForm from "@/components/forms/AddProductForm";
import Heading from "@/components/atoms/Heading";
import Wrapper from "@/components/atoms/Wrapper";
import Info from "@/components/atoms/Info";
import ProductCard from "@/components/atoms/ProductCard";
import {checkoutMachineContext} from "@/providers/CheckoutMachineProvider";
import {ContextProductType} from "@/models/Machine";

const Cart: React.FC = () => {
  const items = checkoutMachineContext.useSelector(
    (state: any) => state.context.items
  );
  const actorRef = checkoutMachineContext.useActorRef();

  const handleAddItem = (item: ContextProductType) => {
    actorRef.send({type: "ADD_ITEM", item: item});
  };

  const handleRemoveItem = (item: ContextProductType) => {
    actorRef.send({type: "REMOVE_ITEM", id: item.id});
  };

  const ProductList: React.FC = () => {
    return (
      <>
        {items.length > 0 ? (
          <div className="grid grid-cols-3 gap-10">
            {items.map((item: ContextProductType) => (
              <ProductCard
                key={item.id}
                item={item}
                handleRemoveItem={() => handleRemoveItem(item)}
              />
            ))}
          </div>
        ) : (
          <Info>Koszyk jest pusty.</Info>
        )}
      </>
    );
  };

  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-8">
        <Heading>Koszyk</Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <div className="col-span-1">
          <AddProductForm handleAddItem={handleAddItem} />
        </div>
        <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          <ProductList />
          <div className="flex justify-center mt-10 pt-10 border-t-2 border-primary border-opacity-15">
            <button
              className="btn btn-primary"
              disabled={!items.length}
              onClick={() => actorRef.send({type: "ADDRESS"})}
            >
              Address
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
