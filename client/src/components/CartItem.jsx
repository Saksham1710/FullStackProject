import React,{useState,  useEffect} from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';

const CartItem = ({ item, onIncrease, onDecrease, onDelete, onUpdateQuantity }) => {
   const [totalPrice, setTotalPrice] = useState(item.price * item.quantity);


  useEffect(() => {
    setTotalPrice(item.pricePerPiece * item.quantity);
  }, [item.quantity]);
  // Function to handle increasing quantity
  const handleIncrease = () => {
    onIncrease(item);
    onUpdateQuantity(item._id, item.quantity + 1);
    // Call onUpdateQuantity with the new quantity
  };

  // Function to handle decreasing quantity
  const handleDecrease = () => {
    onDecrease(item);
    // Call onUpdateQuantity with the new quantity
    onUpdateQuantity(item._id, item.quantity - 1);
  };

  return (
    <div className="cart-item" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
      <div style={{ marginRight: '10px' }}>
        <img src={item.image} alt={item.title} style={{ width: '150px', height: '150px',borderRadius:'10px' }} />
      </div>
      <div className="item-details" style={{ flexGrow: 1, marginRight: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="name" style={{ fontWeight: 'bold',fontSize:'20px',color:"#533e2d" }}>{item.title}</span>
          <span className="price" style={{color:"#533e2d",fontSize:'22px'}}>${totalPrice.toFixed(2)}</span>
        </div>
        {/* if product type is bottled then instead of weight it should display volume and packing */}
        {item.type === 'bottled' ? (
          <div>
            <span className="weight" style={{ color: "#533e2d" }}>Volume: {item.mlQuantity} </span><br/>
            <span className="packing" style={{ color: "#533e2d" }}>Packing: {item.packing} </span>
          </div>
        ) : (
          <span className="weight" style={{ color: "#533e2d" }}>Weight: {item.packing} lb</span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <span style={{marginRight:'10px'}}>Qty:</span>
          <button onClick={handleDecrease}>-</button>
          <span className="quantity" style={{ margin: '0 10px' }}>{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
          <MDBIcon icon="trash-alt" style={{ marginLeft: 'auto', cursor: 'pointer', }} onClick={() => onDelete(item._id)} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
