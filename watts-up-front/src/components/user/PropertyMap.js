import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';

const PropertyMap = ({ location, setLocation }) => {
  const theme = useTheme();

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return location ? <Marker position={location} /> : null;
  };

  return (
    <MapContainer 
      center={[45.24518492531696, 19.84803071801117]} 
      zoom={13} 
      style={{
        height: 300, width: '100%', 
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default PropertyMap;
