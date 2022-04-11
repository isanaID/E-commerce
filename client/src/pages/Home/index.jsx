import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from '../../components/TopBar';
import { config } from "../../config";
import GetProducts from '../../components/Products';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage, goToNextPage, goToPrevPage } from '../../features/Products/actions';

export default function Home() {
    let dispatch = useDispatch();
    let products = useSelector(state => state.products);

    React.useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch])

        return (
        <div>
            <div>
                <TopBar />
            </div>
            <Container>
                <h1>Home</h1>
                <div className="row  d-flex justify-content-evenly">
                    {products.data.map((product, index) => {
                        return (
                            <div className="col-md-3" key={index}>
                                <GetProducts
                                    name={product.name}
                                    price={product.price}
                                    img={`${config.api_host}/images/products/${product.image_url}`}
                                    onAddToCart={_ => null}
                                />
                            </div>
                        )})}
                </div>
            </Container>
        </div>
        )
    }