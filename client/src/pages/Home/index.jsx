import * as React from "react";
import 'upkit/dist/style.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from '../../components/TopBar';
import { config } from "../../config";
import { 
    SideNav, 
    LayoutSidebar,
    Responsive, 
    CardProduct,
    Pagination,
    InputText,
    Pill 
  } from 'upkit';
import GetProducts from '../../components/Products';
import Cart from '../../components/Cart';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import RotateLoader from 'react-spinners/BarLoader';
import { addItem, removeItem } from '../../features/Cart/actions';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, setPage, goToNextPage, goToPrevPage, setKeyword, setTags, toggleTag } from '../../features/Products/actions';

export default function Home() {
    let dispatch = useDispatch();
    let products = useSelector(state => state.products);
    let cart  = useSelector(state => state.cart);
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch, products.currentPage]);

        return (
        <div>
            <div>
                <TopBar />
            </div>
            {<div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
            <div className="w-full md:w-3/4 pl-5 pb-10">
            <Container>
                
                <h2> Selamat datang di Store</h2>
                {/* <div className="mb-5 pl-2 flex w-3/3 overflow-auto pb-5">
                    {tags[products.category].map((tag, index) => {
                        return <div key={index}>
                        <Pill
                            text={tag}
                            icon={tag.slice(0,1).toUpperCase()}
                            isActive={products.tags.includes(tag)}
                            onClick={_ => dispatch(toggleTag(tag))}
                        />
                        </div>
                    })}
                </div> */}

                {products.status === 'process' && !products.data.length ? 
                <div className="flex justify-center">
                    <RotateLoader color="blue"/> 
                </div>
                : null}

                <Responsive desktop={3} items="stretch">
                    {products.data.map((product, index) => {
                        return <div key={index} className="p-2">
                        <CardProduct
                        title={product.name}
                        imgUrl={`${config.api_host}/images/products/${product.image_url}`}
                        price={product.price}
                        onAddToCart={_ => dispatch(addItem(product))}
                        />
                        </div>
                    })}
                </Responsive>

                <div className="text-center my-10">
                <Pagination 
                    totalItems={products.totalItems} 
                    page={products.currentPage}
                    perPage={products.perPage}
                    onChange={page => dispatch(setPage(page))}
                    onNext={_ => dispatch(goToNextPage())}
                    onPrev={_ => dispatch(goToPrevPage())}
                    color="blue"
                />
                </div>
                </Container>
                </div>
                <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
                    <Cart 
                    items={cart}
                    onItemInc={item => dispatch(addItem(item))}
                    onItemDec={item => dispatch(removeItem(item))}
                    onCheckout={_ => navigate('/checkout')}
                    />
                </div>
                </div>}
        </div>
        )
    }