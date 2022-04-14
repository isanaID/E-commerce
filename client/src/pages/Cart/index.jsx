import * as React from 'react';
import 'upkit/dist/style.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from '../../components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/Products/actions';
import { addItem, removeItem } from '../../features/Cart/actions';
import { useNavigate } from 'react-router-dom';

export default function Cart({items}){
    let dispatch = useDispatch();
    const navigate = useNavigate();
    let products = useSelector(state => state.products);
    let cart = useSelector(state => state.cart);

    React.useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);
  return (
    <div>
        <div>
        <TopBar />
        </div>
        <div className="container">
            <div className="row">
            <Cart 
                items={cart}
                onItemInc={item => dispatch(addItem(item))}
                onItemDec={item => dispatch(removeItem(item))}
                onCheckout={_ => navigate("/checkout")}
            />
            </div>
        </div>
    </div>
  )
}