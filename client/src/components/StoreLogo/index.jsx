import * as React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';

export default function StoreLogo(){
    return (
    <div>
      <Link to="/">
            {config.site_title}
      </Link>
      </div>
    )
 }