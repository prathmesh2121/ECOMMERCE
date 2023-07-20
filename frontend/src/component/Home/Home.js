import React, { Fragment, useEffect } from 'react';
import {CgMouse} from 'react-icons/cg';
import "./Home.css"
import Product from './Product.js'
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productAction';
import {useSelector, useDispatch} from "react-redux"
import { useAlert } from "react-alert";

const Home=()=>{
    console.log("in home")


    const alert=useAlert();                      
    const dispatch = useDispatch();
    //This hook returns a reference to the dispatch function from the Redux store

    const { loading, error, products } = useSelector((state) => state.products);


    useEffect(()=>{

        if(error)
        {
            return alert.error(error);
        }

        dispatch(getProduct())
    },[dispatch, error])
    // The useEffect Hook allows you to perform side effects in your components.
    //Some examples of side effects are: fetching data, directly updating the DOM, and timers

  return (
    <Fragment>
        <MetaData title="PixelMart" />
        <div className="banner">
            <p>WEL COME TO PIXELMART</p>
            <h2>FIND AMAZING PRODUCTS BELOW</h2>
            <a href="#container">
                <button>
                    <b>LETS GO !! </b>
                </button>
            </a>
        </div>

        <h2 className='homeHeading'>Featured Product</h2>
        <div className='container' id='container'>
            
            {products && products.map((product)=><Product product={product}/>)}
 
        </div>
    </Fragment>
  )
}

export default Home