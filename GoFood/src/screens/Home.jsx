import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

const Home = () => {
  const [foodcat, setFoodCat] = useState([]);
  const [fooditem, setFoodItem] = useState([]);
  const [search , setsearch] = useState('');  

  const loadData = async () => {
    try {
      let res = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      res = await res.json();
      setFoodItem(res[0]);
      setFoodCat(res[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
          <div className='carousel-inner' id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://source.unsplash.com/random/900x700/?cake" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?soup" className="d-block w-100" alt="..." />
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div></div>
      <div className='container'>
        {
          foodcat.length !== 0 && fooditem.length !== 0
            ? foodcat.map((category) => (
              <div className='row mb-3' key={category._id}>
                <div className='fs-3 m-3'>{category.CategoryName}</div>
                <hr />
                {fooditem.filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map(filteredItem => (
                    <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                      <Card fooditem = {filteredItem}
                        
                        options={filteredItem.options[0]}
                        
                      />
                    </div>
                  ))}
              </div>
            ))
            : <div>No data found</div>
        }
      </div>
      <div><Footer /></div>
    </div>
  );
}

export default Home;