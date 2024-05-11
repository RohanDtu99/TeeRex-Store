import React, { useState , useEffect, createContext, useContext } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import './Style.css'
import { ShoppingCart } from './ShoppingCart'
import DataContext from './DataContext'


export default function ProductListingPage() {
    const {data , setData , cartProducts , setCartProducts , myStorage,cartItemCount, setCartItemCount } = useContext(DataContext)
    const navigate = useNavigate();
    const location = useLocation()
    const [search , setSearch] = useState('')
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        color: [],
        gender: [],
        price: [],
        type: []
    });
   

    useEffect(()=>{
        fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json').then((result)=>{
            result.json().then((res)=>{
                setData(res);
                setProducts(res)
            })
        })
    },[])



    const handleFilterChange = (event, filterType) => {
    let { value, checked } = event.target;
    if(filterType==='price')value=JSON.parse(value);
    console.log(checked);
    
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: [...prevFilters[filterType], value]
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter((item) => {
          if (filterType === 'price' && typeof item === 'object') {
            return item.left !== value.left || item.right !== value.right;
          }
          return item !== value;
        }
      )
      }));
    }
  };

  useEffect(() => {
    console.log(filters);
    const applyFilters = () => {
      let filteredData = [...products];
      function doesSatisfy(xyz,price){
        let ans=false;
        for(const fil of xyz){
          if(price>=fil.left&&price<=fil.right){
            ans=true;
            break;
          }
        }
        return ans;
      }
      for (const filterType in filters) {
        if(filterType==='price'){
          if (filters[filterType].length > 0) {
          filteredData = filteredData.filter((product) => {
            return doesSatisfy(filters[filterType],product[filterType]);
          });
        }
        }
        else{
        if (filters[filterType].length > 0) {
          filteredData = filteredData.filter((product) =>
            filters[filterType].includes(product[filterType])
          );
        }
      }
      }
      setData(filteredData);
    };
    applyFilters();

  }, [filters, products]);


    // add to cart
    const addToCart = (product)=>{
      const isAlreadyInCart = cartProducts.some(items=> items.id === product.id)
      if(!isAlreadyInCart && product.quantity >= 1){
          setCartProducts([...cartProducts , product])
          // console.log(isAlreadyInCart)
          console.log("Added in cart")
          
      }
      else if(!isAlreadyInCart && product.quantity < 1){
          alert('Out of stock')
      }
      else{
          alert('Already in cart')
      }
    }
   
    useEffect(()=>{
        localStorage.setItem(myStorage , JSON.stringify(cartProducts))
        console.log('Card is rendering' , cartProducts)
        setCartItemCount(cartProducts.length)
    }, [cartProducts])

    
    function GoToCartPAge (){
      navigate("/shopping-cart" , {state:data})
    }
    

  return (  
    <>

    <nav className="navbar">
      <div className="navbar-left">
        <span>TeeRex Store</span>
      </div>
      {/* <div className="navbar-right">
        <div className='product-nav' onClick={()=>navigate('/')}><span>Products</span></div>
        <div>
        <img src='shopping-cart.png' alt="Cart" className="cart-icon" onClick={GoToCartPAge} />
        <span className="cart-item-count" onClick={()=>navigate('/shopping-cart')}>{cartItemCount}</span>
        </div>
      </div> */}

      <div className="navbar-right">
      <div className={`product-nav ${location.pathname === '/' ? 'active-route' : ''}`} onClick={()=>navigate('/')}><span>Products</span></div>
      <div>
        <img src='shopping-cart.png' alt="Cart" className="cart-icon" onClick={GoToCartPAge} />
        <span className="cart-item-count" onClick={()=>navigate('/shopping-cart')}>{cartItemCount}</span>
      </div>
     </div>


    </nav>
    
    <div className="search-div">
      <input type="text" className="search-input"  placeholder='search for products...' onChange={(e)=>setSearch(e.target.value)} />
    </div>
    
    {/* <button onClick={searchProduct}>Search</button> */}


    <div className="container">
      <div className='filters'>
        <h3>Filters</h3>
        <div>
          <span>Color:</span>
          <label>
            <input
              type="checkbox"
              value="Red"
              onChange={(e) => handleFilterChange(e, 'color')}
            />
            Red
          </label>
          <label>
            <input
              type="checkbox"
              value="Blue"
              onChange={(e) => handleFilterChange(e, 'color')}
            />
            Blue
          </label>

          <label>
            <input
              type="checkbox"
              value="Green"
              onChange={(e) => handleFilterChange(e, 'color')}
            />
            Green
          </label>

          <span>Gender:</span>
          <label>
            <input
              type="checkbox"
              value="Men"
              onChange={(e) => handleFilterChange(e, 'gender')}
            />
            Men
          </label>

          <label>
            <input
              type="checkbox"
              value="Women"
              onChange={(e) => handleFilterChange(e, 'gender')}
            />
            Women
          </label>

          <span>Price:</span>
          <label>
            <input
              type="checkbox"
              value={JSON.stringify({left: 0, right: 250})}
              onChange={(e) => handleFilterChange(e, 'price')}
            />
            Rs0-250
          </label>

          <label>
            <input
              type="checkbox"
              value={JSON.stringify({left: 250, right: 300})}
              onChange={(e) => handleFilterChange(e, 'price')}
            />
            Rs250-300
          </label>

          <label>
            <input
              type="checkbox"
              value={JSON.stringify({left: 300, right: 450})}
              onChange={(e) => handleFilterChange(e, 'price')}
            />
            Rs300-450
          </label>

          <span>Type:</span>
          <label>
            <input
              type="checkbox"
              value="Polo"
              onChange={(e) => handleFilterChange(e, 'type')}
            />
            Polo
          </label>

          <label>
            <input
              type="checkbox"
              value="Hoodie"
              onChange={(e) => handleFilterChange(e, 'type')}
            />
            Hoodie
          </label>

          <label>
            <input
              type="checkbox"
              value="Basic"
              onChange={(e) => handleFilterChange(e, 'type')}
            />
            Basic
          </label>
        </div>
      </div>

      <div className='product-container'>
        {
          data.filter((item) =>
            item.name.toLowerCase().includes(search) ||
            item.type.toLowerCase().includes(search) ||
            item.color.toLowerCase().includes(search)||
            item.gender.toLowerCase().includes(search)
          )
            .map((item) => {
              return (
                <div className="product-card" key={item.id}>
                  <span>{item.name} </span>
                  <img src={item.imageURL} alt={item.name} />
                  <div className="product-info">
                    <p>Rs. {item.price}</p>
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>





    
    </>
    
  )
}
