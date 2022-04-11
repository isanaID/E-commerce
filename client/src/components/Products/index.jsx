import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from "react-bootstrap";
export default class GetNews extends React.Component {
    render() {
        return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.img} />
        <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
            <br/>Rp. {this.props.price}
            </Card.Text>
            <Button href={this.props.onAddToCart} variant="primary">Beli</Button>
        </Card.Body>
        </Card>
        )
    }
}