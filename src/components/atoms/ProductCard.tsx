import React from "react";
import {ContextProductType} from "@/models/Machine";

type ProductCardProps = {
  item: ContextProductType;
  handleRemoveItem: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({item, handleRemoveItem}) => {
  return (
    <div className="card w-full bg-white shadow-lg">
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p className="text-xs">{item.price} sztuk złota</p>
        {item.requiresShipping && (
          <p className="text-xs text-primary italic">Obowiązkowa dostawa</p>
        )}
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm text-xs btn-error text-white"
            onClick={handleRemoveItem}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
