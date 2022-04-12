import * as React from "react";
import 'upkit/dist/style.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from '../../components/TopBar';
import { config } from "../../config";
import GetProducts from '../../components/Products';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import RotateLoader from 'react-spinners/BarLoader';
import { addItem } from '../../features/Cart/actions';
import { fetchProducts, setPage, goToNextPage, goToPrevPage } from '../../features/Products/actions';
import { Pagination } from 'upkit';

export default function Home() {
    let dispatch = useDispatch();
    let products = useSelector(state => state.products);

    React.useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch, products.currentPage]);

        return (
        <div>
            <div>
                <TopBar />
            </div>
            <Container>
                <div className="row">
                <h2> Selamat datang di Store</h2>

                {products.status === 'process' && !products.data.length ? 
                <div className="row h-100">
                <div className="col-sm-12 my-auto">
                <div className="my-auto mx-auto d-flex align-content-center justify-content-center">
                    <RotateLoader color="blue"/> 
                </div>
                </div>
                </div>
                : null}
                <div className="row d-flex justify-content-evenly">
                    {products.data.map((product, index) => {
                        return (
                            <div className="col-md-3" key={index}>
                                <GetProducts
                                    name={product.name}
                                    price={product.price}
                                    img={`${config.api_host}/images/products/${product.image_url}`}
                                    onAddToCart={_ => dispatch(addItem(product))}
                                />
                            </div>
                        )})}
                </div>
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
                </div>
            </Container>
        </div>
        )
    }