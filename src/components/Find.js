import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Input,
    Segment,
    Button,
    Grid,
    Divider,
    Header,
    List,

} from 'semantic-ui-react'


// used to search for a specific country
// it takes a counry keyword and is set a a state
const SearchBox = ({ countryName, setCountryName }) => {
    const searchCountry = (event) => {
        setCountryName(event.target.value);
    };

    return (
        <Segment>
            <div>
                    <Input
                        icon={{ name: 'search', circular: true, link: true }}
                        placeholder='Search...'
                        value={countryName}
                        onChange={searchCountry}
                    />
            </div>
        </Segment>
    );
};

// this is used to render the search result for the matched countries from the weather API
//
const ShowMatchDetails = ({ country }) => {

    const [temp, setTemp] = useState(0);
    const [icon, setIcon] = useState('');
    const [wind, setWind] = useState('');

    const dispMatchLang = () => country.languages.map(lang =>
        <li>{lang.name}</li>);

    // gets the weather information fo a particularmatch
    // makes a request to the openweather API for a particular city weather Information
    const WeatherInfo = () => {
        useEffect(() => {
            const fetchData = async () => {
                const response = await axios
                    .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=57931c248a6c40409a3da993a10b5c0c`)
                        const weatherData = response.data;
                        console.log(weatherData)
                        setTemp(weatherData.main.temp);
                        setIcon(`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
                        setWind(`${weatherData.wind.speed.toString()}  m/s  ${weatherData.wind.deg.toString()}  degrees`);
            }
            fetchData();
        }, [])
        
        
        // return (
            //     <Segment>
        //         <div>
        //             <h2>Weather in {country.capital}</h2>
        //             <strong>temperature: </strong>{temp} Kelvin<br />
        //             <img
        //                 src={icon}
        //                 alt={`weather icon for ${country.capital}`}
        //                 height="100px"
        //                 width="120px" /><br />
        //             <strong>Wind: </strong>{wind}
        //         </div>
        //     </Segment>
        // );
    };
    WeatherInfo()

    return (
        <Segment>
            <Grid columns={2} stackable textAlign='center'>
            <Divider vertical></Divider>
            <Grid.Row verticalAlign="middle">
                <Grid.Column>
                    <div>
                        <h1>{country.name}</h1>
                        <p>capital {country.capital}</p>
                        <p>population: <b>{country.population}</b></p><br />

                        <h3>languages</h3>
                        <p>{dispMatchLang()}</p>
                        <img
                            src={country.flag}
                            alt={`${country.demonym}, Match Flag!!!`}
                            height="120px"
                            width="150px" />
                    </div>

                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <div>
                            <h2>Weather in {country.capital}</h2>
                            <strong>temperature: </strong>{temp} Kelvin<br />
                            <img
                                src={icon}
                                alt={`weather icon for ${country.capital}`}
                                height="100px"
                                width="120px" /><br />
                            <strong>Wind: </strong>{wind}
                            </div>
                    </Segment>
                </Grid.Column>

            </Grid.Row>
            </Grid>
        </Segment>
    );
};

// Renders the matches for a particular query
// makes use of a show button to display the weather informaton of particular city.

const ShowMatches = ({ country, setCountryName }) => (
        <div key={country.name}>
            {/* the onclick handler sets the value of the input field to the
            renderd country using the state of the query */}
            <List divided verticalAlign="middle">
                <List.Item>
                    {country.name}
                    <Button
                        basic
                        color='green'
                        content='Show'
                        onClick={() => setCountryName(country.name)}
                    />

                </List.Item>
            </List>
        </div>

    );

    // returns a match fom the restcountries API
    // renders the mathes based on the number of matched countries found
//
const CountryDetails = ({ countries = [], countryName, setCountryName }) => {
    if (countryName === '') {
        setCountryName('Nigeria');
    }

    const matches = countries.filter(country =>
        country.name.toLowerCase().includes(countryName.toLowerCase()));


    if (matches.length === 1) {
        return <ShowMatchDetails country={matches[0]} />;
    } else if (matches.length <= 10) {
        return matches.map(country => (
            <ShowMatches key={country.name} country={country} setCountryName={setCountryName} />
        ));
    } return <div>Too Many Matches, specify another filter</div>;
};

// A component that enables users search for a specific country
// using a search keyword and a displayinglist of macthed result.
const Find = ({ countries, countryName, setCountryName }) => (
    <div>
        <SearchBox setCountryName={setCountryName} />
        <CountryDetails
            countries={countries}
            countryName={countryName}
            setCountryName={setCountryName} />
    </div>

    );


export default Find;

