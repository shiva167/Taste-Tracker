
import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import Card from '../Component/Card'
import Our from './Our'
import cro2 from '../img/cro2.jpg'

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0],response[1]);

  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div> <Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade vh-100 mt-5" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search here" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>

          <div className="carousel-item active h-50 ">
            <img src={cro2} className="d-block w-100 h-50" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/500x200/?chowmein" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/500x200/?salads" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button></div></div>
      <div id="services" >
        <div className='container mt-lg-4'  >
          {
            foodCat !== []
              ? foodCat.map((data) => {
                return (<div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3' style={{ color: '#75AB42' }}>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ?
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItem={filterItems} options={filterItems.options[0]}>

                            </Card>
                          </div>
                        )
                      })
                    : <div>No such data was found!</div>}
                </div>
                )


              }) : ""
          }
        </div>
      </div>
      <div>
        <Our />

      </div>
      <div><Footer /></div>


    </>
  )
}