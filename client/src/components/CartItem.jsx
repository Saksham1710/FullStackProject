import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';

const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  return (
    <div className="cart-item" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
      <div style={{ marginRight: '10px' }}>
        <img src={item.image} alt={item.title} style={{ width: '150px', height: '150px',borderRadius:'10px' }} />
      </div>
      <div className="item-details" style={{ flexGrow: 1, marginRight: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="name" style={{ fontWeight: 'bold',fontSize:'20px',color:"#533e2d" }}>{item.title}</span>
          <span className="price" style={{color:"#533e2d",fontSize:'22px'}}>{item.price}</span>
        </div>
        <span className="weight">Weight: {item.packing}</span>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <span style={{marginRight:'10px'}}>Qty:</span>
          <button onClick={() => onDecrease(item)}>-</button>
          <span className="quantity" style={{ margin: '0 10px' }}>{item.quantity}</span>
          <button onClick={() => onIncrease(item)}>+</button>
          <MDBIcon icon="trash-alt" style={{ marginLeft: 'auto', cursor: 'pointer', }} onClick={() => onDelete(item._id)} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
