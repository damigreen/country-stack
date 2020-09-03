import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Find from './components/Find';
import {
    Container,
    Header,
    
} from 'semantic-ui-react'

function App() {
    const [countries, setCountries] = useState([]);
    const [countryName, setCountryName] = useState('');

    // make a HTTP request to the restcountries API and use the
    // javascrit promse to set the API responce to the variale name countries
    const hook = (() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                console.log(response.data);
                setCountries(response.data);
            });
    });
    useEffect(hook, []);


    return (
        <Container>
            <Header style={{textAlign: 'center'}} as="h1">Country Stack</Header>
            <Find
                countries={countries}
                countryName={countryName}
                setCountryName={setCountryName} />
        </Container>
    );
}

export default App;
