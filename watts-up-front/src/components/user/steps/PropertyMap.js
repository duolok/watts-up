import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createLocationIcon = (color) => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32" fill="${color}">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  `;
  return L.divIcon({
    html: svgIcon,
    iconSize: [32, 32],
    className: "custom-location-icon",
  });
};

const PropertyMap = ({ location, setLocation }) => {
  const theme = useTheme();
  const mapTheme = theme.palette.mode;
  const markerColor = mapTheme === 'dark' ? '#B0BEC5' : '#333333';
  const markerIcon = createLocationIcon(markerColor);
  
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return location ? (
      <Marker position={location} icon={markerIcon}>
        <Tooltip direction="top" offset={[0, -20]} opacity={1}>{`Lat: ${location[0].toFixed(4)}, Lng: ${location[1].toFixed(4)}`}</Tooltip>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={location || [45.2671, 19.8335]}
      zoom={13}
      style={{ height: 300, width: "100%" }}
      whenCreated={mapInstance => { mapInstance.attributionControl.setPrefix(false); }}
    >
      <TileLayer
        url={mapTheme === 'dark' ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default PropertyMap;

