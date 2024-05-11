import React, { useContext, useEffect, useState } from 'react'
import './Style.css'
import {useNavigate} from 'react-router-dom'
import DataContext from './DataContext'
import { useLocation } from 'react-router-dom'

export const ShoppingCart = () => {
  const { cartProducts , setCartProducts , myStorage , cartItemCount , setCartItemCount} = useContext(DataContext)
  const navigate = useNavigate();
  const location = useLocation()

  // const location = useLocation()
  const [data2, setData2] = useState([]);
  useEffect(()=>{
        fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json').then((result)=>{
            result.json().then((res)=>{
                setData2(res);

            })
        })
    },[])


  //Remove items from cart
  function deleteProduct(productId){
    const updatedList = cartProducts.filter((item)=>{
      return item.id !== productId;
    })
    setCartProducts(updatedList);

    const localStorageData = JSON.parse(localStorage.getItem(myStorage));
    const updatedLocalStorage = localStorageData.filter((item) => {
      return item.id !== productId;
    });
    localStorage.setItem(myStorage, JSON.stringify(updatedLocalStorage));
  }
  
  useEffect(()=>{
    setCartItemCount(cartProducts.length)
  },[cartItemCount , deleteProduct])


  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, item) => total + item.price*item.quantity, 0);
};


function GoToCartPAge (){
  navigate("/shopping-cart" )
}


  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <span>TeeRex Store</span>
      </div>
      <div className="navbar-right">
        <div className='product-nav' onClick={()=>navigate('/')}><span>Products</span></div>
        <div>
        <img src='shopping-cart.png' alt="Cart" className={`cart-icon ${location.pathname === '/shopping-cart' ? 'active-route' : ''}`} onClick={GoToCartPAge} />
        <span className="cart-item-count">{cartItemCount}</span>
        </div>
        
      </div>
    </nav>   

    <div className='cartProduct-container'>
        {
            data2&&cartProducts.map((items, index)=>{
                const productData = data2.find(dataItem => dataItem.id === items.id);
                console.log(productData)
                return(
                    <>
                        <div className="cart-item" >
                            
                        <img src={items.imageURL} alt={items.name} />
                        <div className="name-price-controls">
                        <p>{items.name}</p>
                        <p>Price: {items.price}</p>
                        </div>
                        <div className="product-info">
                            
                            <div className="quantity-controls">
                            <button onClick={() =>{ 
                      
                              const updatedCartProducts = [...cartProducts]; // Copying the original array
                              updatedCartProducts[index].quantity = Math.min(items.quantity + 1,productData.quantity); // Updating the quantity
                            // console.log(updatedCartProducts);
                              setCartProducts(updatedCartProducts);
                              }
                              } >
                              +
                            </button>
                            <span >{items.quantity}</span>
                            <button onClick={() =>{ 
                              const updatedCartProducts = [...cartProducts]; // Copying the original array
                              updatedCartProducts[index].quantity = Math.max(items.quantity - 1, 1); // Updating the quantity
                              //console.log(updatedCartProducts);
                              setCartProducts(updatedCartProducts);}
                              } >
                              -
                            </button>

                            <button onClick={() => deleteProduct(items.id)}>Remove</button>

                            </div>
                            {/* <button onClick={() =>{ 
                      
                              const updatedCartProducts = [...cartProducts]; // Copying the original array
                              updatedCartProducts[index].quantity = Math.min(items.quantity + 1,productData.quantity); // Updating the quantity
                             // console.log(updatedCartProducts);
                              setCartProducts(updatedCartProducts);
                              }
                              } >
                              +
                            </button> */}
                            
                            {/* <button onClick={() =>{ 
                              const updatedCartProducts = [...cartProducts]; // Copying the original array
                              updatedCartProducts[index].quantity = Math.max(items.quantity - 1, 1); // Updating the quantity
                              //console.log(updatedCartProducts);
                              setCartProducts(updatedCartProducts);}
                              } >
                              -
                            </button>

                            <span>{items.quantity}</span> */}

                            
              
                        </div>
                       
                        </div>
                        
                        
                    </>
                )
            })
        }
    </div> 



    <h2 className='total-Price'>Total price is : {calculateTotalPrice()}</h2>


     
    </>
  )
}




// const CartItem = ({ item, deleteProduct, increment, decrement }) => {
//   const { name, price, quantity, imageURL } = item;

//   return (
//     <div className="cart-item">
//       <img src={imageURL} alt={name} />
//       <div className="product-info">
//         <span>{name}</span>
//         <p>${price}</p>
//         <div className="quantity-controls">
//           <button onClick={() => decrement(item)}> - </button>
//           <span>{quantity}</span>
//           <button onClick={() => increment(item)}> + </button>
//         </div>
//         <button onClick={() => deleteProduct(item.id)}>Remove</button>
//       </div>
//     </div>
//   );
// };

// const Cart = ({ cartProducts, deleteProduct, increment, decrement }) => {
//   return (
//     <div className="cart-container">
//       {cartProducts.map((item, index) => (
//         <CartItem
//           key={item.id}
//           item={item}
//           deleteProduct={deleteProduct}
//           increment={increment}
//           decrement={decrement}
//         />
//       ))}
//     </div>
//   );
// };