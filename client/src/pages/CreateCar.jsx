import React, { useState, useEffect } from "react";
import "../App.css";
import * as CarAPI from "../services/CarAPI";
import * as RoofAPI from "../services/RoofAPI";
const CreateCar = () => {
  const [car, setCar] = useState({
    exterior: "",
    roof: "",
    price: 1495,
  });

  const [exteriors, setExteriors] = useState("");
  const [interior, setInterior] = useState("");
  const [roof, setRoof] = useState("");
  // const [price, setPrice] = useState(0);

  //   const [roofData, setroofData] = useState();
  const [exteriorData, setExteriorData] = useState();
  //   const [interiorData, setInteriorData] = useState([]);
  const [exteriorPrice, setexteriorPrice] = useState(0);
  const [roofs, setRoofs] = useState([]);
  const [roofPrice, setroofPrice] = useState(0);

  const [isConvertible, setIsConvertible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await CarAPI.getAllColors();
        setExteriorData(data);
        console.log("Data1", data);
        const data2 = await CarAPI.getAllRoof();
        console.log("Data2", data2);
        setRoofs(data2);
      } catch (error) {
        throw error;
      }
    })();
  }, []);
  const handleChangeRoof = (event) => {
    var divElem = document.querySelector(".img__wrap");
    divElem.classList.toggle("Selected");
    const { id, value } = event.target;
    if (isConvertible && id === "Targa Blue Transparent") {
      alert("Targa Blue Transparent is not available for convertible");
      setRoof("");
    } else {
      for (let i = 0; i < roofs.length; i++) {
        if (roofs[i].color === event.target.id) {
          const priceroof = roofs[i].price;
          setroofPrice(priceroof);
        }
      }

      setRoof(event.target.id);
      setCar((prevCar) => ({
        ...prevCar,
        roof: roof,
      }));
      console.log("This car price of roof ", car);
    }
  };

  const handleChangeExterior = (event) => {
    const { id, value } = event.target;
    setExteriors(event.target.id);

    setCar((prevCar) => ({
      ...prevCar,
      exterior: exteriors,
    }));

    console.log("This car price of exterior ", car);
    for (let i = 0; i < exteriorData.length; i++) {
      if (exteriorData[i].color === event.target.id) {
        const priceroof = exteriorData[i].price;
        setexteriorPrice(exteriorData[i].price);
      }
    }

    console.log("Thifff ee  ", exteriors);
    console.log("pppppr  ", exteriorPrice);
  };
  const SubmitcreateCar = (event) => {
    const price = exteriorPrice + roofPrice;
    setCar((prevCar) => ({
      ...prevCar,
      price: price,
    }));

    console.log("This car price ", car);
    event.preventDefault();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      };

      fetch("http://localhost:3000/api", options);
      // window.location = "/";
    
  };

  const RoofOption = () => {
    var divElem = document.querySelector(".roofcontainer");
    divElem.classList.toggle("mystyle");
  };
  const ExteriorOption = () => {
    var divElem = document.querySelector(".exteriorcontainer");
    divElem.classList.toggle("mystyle");
  };
  const handleconvertibleChange = (event) => {
    setIsConvertible(!isConvertible);
  };

  return (
    <main>
      <div>
        <h1> Create Cars!!</h1>
        <div>
          <h1>Car Customization</h1>

          <label>
            Is Convertible?
            <input
              type="checkbox"
              checked={isConvertible}
              onChange={handleconvertibleChange}
            />
          </label>
          {/* {exteriorData.map(model => (

                console.log("model", model.color)
    ))} */}
          {/* <label htmlFor="roofColor">Roof Color:</label> */}

          <button onClick={RoofOption}> Roof</button>

          <label>{roof}</label>
          <div> Blah baah Blah</div>

          {roofs ? (
            <div className="roofcontainer">
              {/* <select id="carModel" name="carModel"> */}
              {roofs.map((model) => (
                <div>
                  <div className="img__wrap">
                    <img
                      // className="img__img"
                      src={model.image}
                      id={model.color}
                      onClick={handleChangeRoof}
                    />
                    <p class="img__description">{model.color}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="noResults">{"Loading"}</h3>
          )}
          <button onClick={ExteriorOption}> Exterior</button>
          {exteriorData ? (
            <div className="exteriorcontainer">
              {/* <select id="carModel" name="carModel"> */}
              {exteriorData.map((model) => (
                <div class="img__wrap">
                  <img
                    className="img__img"
                    src={model.image}
                    id={model.color}
                    valueHi={model.color}
                    onClick={handleChangeExterior}
                  />
                  <p class="img__description">This image looks super neat.</p>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="noResults">{"Loading"}</h3>
          )}

          <label htmlFor="carModel">Car Model:</label>

          <select id="carModel" name="carModel">
            <option value="">Select Car Model</option>
          </select>

          <br />
          <br />

          <button type="submit" onClick={SubmitcreateCar}>
            Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateCar;
