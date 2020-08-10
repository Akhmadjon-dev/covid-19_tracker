import React, {useState, useEffect} from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import {Card, CardContent} from '@material-ui/core'
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  // disease.sh get countries by this url https://disease.sh/v3/covid-19/continents
  useEffect(() => {
      // async => send reques and use it
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // Uzbekistan,  
              value: country.countryInfo.iso2 // UK, USA,UZ
            }
          ));

          setCountries(countries);
        });
      };
      getCountriesData();
  }, [])
  
  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    console.log('+++++++++', countryCode)
    setCountry(countryCode);
  }


  return (
    <div className="app">
      <div className="left">
      <div className="app__header">
      <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country}
          onChange={onCountryChange}>
            {/* loop all countries */}
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        {/* info box */} 
        <InfoBox title="Corana cases" cases="151561" total="4511778"/>
        <InfoBox title="Recovered"  cases="151561" total="87498684"/>
        <InfoBox title="Deaths" cases="151561" total="24522" />
      </div>
      <Map />
      </div>
      <Card className="right">
         <CardContent>
           <h3>
             Live Cases by Country
           </h3>
           <h3>
             WorldWide new cases
           </h3>
         </CardContent>
      </Card>
    </div>
  );
}

export default App;
