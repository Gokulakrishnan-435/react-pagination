import React, { useState, useEffect } from "react";
import axios from "../Axios/axios";

import ReactPaginate from "react-paginate";

const Fetching = () => {
  let [state, setState] = useState([]);
  let [loading, setLoading] = useState({
    loading: false,
  });
  let [searchItem, setSearchItem] = useState("");
  let [pageNumber, setPageNumber] = useState(0);
 
  let dataPerPage = 4;
  let dataVisited = pageNumber * dataPerPage;
  let displayData = state
    .slice(dataVisited, dataVisited + dataPerPage)
    .map(x => (
      <div key={x.id}>
        <ul className="bg-slate-800 text-white text-3xl align-middle h-12 flex justify-between">
          <li>{x.id}</li>
          <li>{x.title}</li>
          <li>{x.price}</li>
        </ul>
        <img className="w-56 h-56" src={x.image}  />
      </div>
    ));
   let mapData = state
     .filter(val => {
       if (searchItem === "") {
         return val;
       } else if (val.title.toLowerCase().includes(searchItem.toLowerCase())) {
         return val;
       }
     })
     .map(x => {
       
     });

  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get("products");

      try {
        setState(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  console.log(state);
  let pageCount = Math.ceil(state.length / dataPerPage);
  let handleChange = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className=" w-[80%] mx-auto mt-16">
      <input
        type="search"
        name="searchItem"
        placeholder="search here"
        value={searchItem}
        onChange={e => setSearchItem(e.target.value)}
      />
      {displayData}
      <ReactPaginate
        className="flex border-separate top-10 justify-around"
        pageCount={pageCount}
        onPageChange={handleChange}
        previousLable={"previos"}
        nextLable={"next"}
      />
    </div>
  );
};

export default Fetching;
