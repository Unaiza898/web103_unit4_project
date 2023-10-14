
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as CarAPI from "../services/CarAPI";
import '../App.css'
import { useParams } from 'react-router-dom'
const ViewCars = () => {

    const { id } = useParams()
    const[cars, setCars] = useState([])

    useEffect(() => {
        (async () => {
          try {
            const data = await CarAPI.getAllcar();
            setCars(data);
            console.log("Data1", data);
         
          } catch (error) {
            throw error;
          }
        })();
      }, []);



      const DeleteCar = (event) => {
        // id = event.target.id;
        const id = event.target.id
        console.log("This car price ", id);
        event.preventDefault();
        const options = {
            method: 'DELETE'
          }
    
          fetch(`/gifts/${id}`, options)
          window.location = '/customcars'
        //   const options = {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(car),
        //   };
    
        //   fetch("http://localhost:3000/api", options);
        //   // window.location = "/";
        
      };
    
    return (
        <div>
           <h1 style={{textAlign: "center"}}>Cars</h1>

           {cars ? (
            <div >
              {/* <select id="carModel" name="carModel"> */}
              {cars.map((model) => (
                <Link to={`/customcars/:${model.id}`} >
               <div className="card" id={model.id}>
               <div className="card-header">
                 <h2 className="card-title">{model.price}</h2>
               </div>
               <div className="card-content">
                 <p> exterior: {model.exterior}</p>
                 <p> roof: {model.roof}</p>
                 <button id={model.id} onClick={DeleteCar}>Delete</button>
               </div>
               </div>
               </Link>
            
              ))}
            </div>
          ) : (
            <h3 className="noResults">{"Loading"}</h3>
          )}




        </div>
    )
}

export default ViewCars