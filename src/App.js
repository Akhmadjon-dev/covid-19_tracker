import React, {useState, useEffect} from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import {Card, CardContent} from '@material-ui/core'
import "leaflet/dist/leaflet.css"
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, []) 
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
          const sorted = sortData(data);
          setTableData(sorted);
          setmapCountries(data)
          setCountries(countries);
        });
      };
      getCountriesData();
  }, [])
  
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
      const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
        .then(res=> res.json())
        .then(data =>{
          setCountry(countryCode);
          setCountryInfo(data);

          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          setMapZoom(4)
        })
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
        <InfoBox isRed active={casesType === 'cases'} onClick={e => setcasesType('cases')} title="Corana cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
        <InfoBox active={casesType === 'recovered'} onClick={e => setcasesType('recovered')} title="Recovered"  cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
        <InfoBox isRed active={casesType === 'deaths'} onClick={e => setcasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
      </div>
      <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="right">
         <CardContent>
           <h3>
             Live Cases by Country
           </h3>
           <Table countries={tableData} />
           <h3>
             WorldWide new {casesType}
           </h3>
           <div className="ling">
           <LineGraph  casesType={casesType}  />
           </div>
         </CardContent>
      </Card>
    </div>
  );
}

export default App;
