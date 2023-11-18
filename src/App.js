
import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';
import { InfoAlert, ErrorAlert } from './components/Alert';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlertText, setErrorAlertText] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity, numberOfEvents]);

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
        allEvents :
        allEvents.filter(event => event.location === currentCity);

      setEvents(filteredEvents.slice(0, numberOfEvents));
      setAllLocations(extractLocations(allEvents));
    } catch (error) {
      console.error('Error fetching events:', error);
      // Handle error, show a message to the user, or implement some fallback behavior.
    }
  }

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlertText.length ? <ErrorAlert text={errorAlertText} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={setErrorAlertText} />
      <EventList events={events} />
    </div>
  );
}

export default App;