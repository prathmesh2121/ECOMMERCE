import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from 'react-rating-stars-component'



const Product = ({product}) => {
    const options = {
        edit : false,
        size : window.innerWidth < 600 ? 20 : 25,
        value : product.ratings ,
        isHalf : true,
    }
  return (
    <div>
        <Link className="productCard" to={product._id}>
            <img src={product.images[0].url}/>
            <p>{product.name}</p>
            <div>
                
                <span>
                    Reviews : {product.numOfReviews}
                </span>
                <span><b>Price : {`₹${product.price}`}</b></span>
                
                <div id='stars'>
                    <span id='rating'>
                        Rating
                    </span>
                    <ReactStars {...options} />
                </div>
            </div>
        </Link>



    </div>
  )
}

export default Product