import React from 'react';
import { Link } from 'react-router-dom';
import  GoogleAuth from './GoogleAuth'; 
import {streamListPath} from '../components/Paths';

const Header = () => {
    return (
        <div className="ui secondary pointing menu" >
            <Link to={streamListPath} className="item">
                StreamFall
        </Link>
            <div className="right menu">
            <Link to={streamListPath} className="item">
            All Streams
            </Link>
            <GoogleAuth />
            </div>
        </div>
    )
};

export default Header;  