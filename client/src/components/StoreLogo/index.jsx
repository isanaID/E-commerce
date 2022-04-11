import * as React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StoreLogo(){
    return (
    <div>
      
            {config.site_title}
      
      </div>
    )
 }