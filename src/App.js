import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown';
import { countries, cities } from './components/constants';
import { useEffect, useState } from 'react';
import Table from './components/Table';

function App() {

  const [selectedCountry, setSelectedCountry] = useState("");
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    // filter the city
  }, [selectedCountry])
  return (
    <div>
      <Table></Table>
      {/* <input></input> */}
      {/* <Dropdown data={countries} selectedVal={selectedCountry} setSelectedVal={setSelectedCountry} ></Dropdown> */}
      {/* <Dropdown data={cityData}></Dropdown> */}
    </div>
  );
}

export default App;
