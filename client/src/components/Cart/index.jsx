import * as React from 'react';
import { arrayOf, string, shape, oneOfType, number, func } from 'prop-types';
import {
    CardItem
} from 'upkit';
import { config } from '../../config';

export default function Cart({items}){
    return <div/>
}

Cart.propTypes = {
    items: arrayOf(shape({
    _id: string.isRequired, 
    name: string.isRequired, 
    qty: oneOfType([string, number]).isRequired
})),
}