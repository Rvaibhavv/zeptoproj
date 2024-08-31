import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import WebView from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import { apikey } from '../../utils/Themes/keys/Keys';
const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [isLocationModal, setIsLocationModal] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Zepto App',
          message: 'Zepto App needs access to your location so you can access location-based products.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location access granted');
        getLocation();
      } else {
        setIsLocationModal(true);
        console.log('Location access denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setIsLocationModal(false);
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <AppWrapper>
      <AppHeader userLocation={userLocation} />
      <AppBody />
      <AppFooter />
    </AppWrapper>
  );
};

const AppHeader = ({ userLocation }) => {
  return (
    <View style={styles.header}>
      <AzureMap userLocation={userLocation} />
    </View>
  );
};

const AppBody = () => {
  return (
    <View style={styles.body}>
      <Text style={{ color: 'black' }}>Hello</Text>
    </View>
  );
};

const AppFooter = () => {
  return (
    <View style={styles.footer}>
      <Text style={{ color: 'black' }}>Hello</Text>
    </View>
  );
};

const AzureMap = ({ userLocation }) => {
  const mapHTML = userLocation
    ? `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Azure Map</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"></script>
        <link rel="stylesheet" href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css" />
        <style>
          html, body, #myMap {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            position: absolute;
          }
        </style>
      </head>
      <body>
        <div id="myMap"></div>
        <script>
          var map = new atlas.Map('myMap', {
            center: [${userLocation.longitude}, ${userLocation.latitude}],
            zoom: 12,
            view: 'Auto',
            authOptions: {
              authType: 'subscriptionKey',
              subscriptionKey: '${apikey}'
            }
          });
        </script>
      </body>
      </html>
    `
    : '';

  return (
    <View style={styles.mapContainer}>
      {userLocation && (
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          style={styles.webview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 400, // Adjust the height as needed
    width: '100%',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  mapContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Home;
