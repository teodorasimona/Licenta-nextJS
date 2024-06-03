import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const MyMarker = ({ lat, lng }: { lat: number; lng: number }) => (
  <LocationOnOutlinedIcon style={{ color: "red" }} />
);

const Map = () => {
  const [latitude, setLatitude] = useState(34.1);
  const [longitude, setLongitude] = useState(-105.2);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error("Error getting location: ", error),
      { timeout: 10000 }
    );
  }, []);

  return (
    <div className="relative w-full" style={{ height: "85vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAzKDwUofqEnwS6DHqoi2roaE6AaIR9FWA" }}
        defaultCenter={{ lat: 34.1, lng: -105.2 }}
        center={{ lat: latitude, lng: longitude }}
        defaultZoom={14}
      >
        <MyMarker lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
