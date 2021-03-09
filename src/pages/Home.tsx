import React, { useState, Component } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import { Plugins } from '@capacitor/core';
import GoogleMapReact from 'google-map-react';
 
const { Geolocation } = Plugins;

// Geo location example
// https://capacitorjs.com/docs/apis/geolocation

// Maps React
// https://github.com/google-map-react/google-map-react

// Maps Capacitor Native
//https://www.npmjs.com/package/capacitor-googlemaps-native

const Home = () => {
  const [status, setStatus] = useState('INIT')
  const [location, setLocation] = useState('');

  const [latitude, setLatitude] = useState(18.4800295);
  const [longitude, setLongitude] = useState(-70.0169204);

  const fetchLocation = () => {
    setStatus('Fetching info!');

    Geolocation.getCurrentPosition()
      .then((result) => {
        //setStatus('Fetched')

        const locationValue = `Lat: ${result.coords.latitude} Long: ${result.coords.longitude}`; 

        setLatitude(result.coords.latitude);
        setLongitude(result.coords.longitude);

        // setStatus(locationValue);
        setLocation(locationValue);
      })
      .catch((error) => {

      });
  }

  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 11
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h4>{status}</h4>
        <h4>{location}</h4>
        <IonButton onClick={fetchLocation}>Ubicacion actual</IonButton>

        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
          </GoogleMapReact>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
