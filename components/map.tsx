import React, { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// Function to create icon URL
const createIconUrl = (iconComponent: React.ReactElement): string => {
  const iconMarkup = renderToStaticMarkup(iconComponent);
  const iconUrl = `data:image/svg+xml,${encodeURIComponent(iconMarkup)}`;
  return iconUrl;
};

const MyMarker = ({ lat, lng }: { lat: number; lng: number }) => {
  const iconUrl = createIconUrl(<LocationOnOutlinedIcon />);
  return <Marker position={{ lat, lng }} icon={{ url: iconUrl }} />;
};

export interface Trail {
  id: number;
  name: string;
  type: "hiking" | "biking" | "walking";
  difficulty: "easy" | "medium" | "hard";
  distance_km: number;
  coordinates: [string, string]; // Longitude and Latitude
  image_url: string;
  route: [number, number][]; // Array of coordinates for the trail route
}

// Function to parse coordinates from string to number
const parseCoordinates = (coordinates: [string, string]): [number, number] => {
  return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
};

// const parseRoute = (route: [string, string][]): [number, number][] => {
//   return route.map((coord) => [parseFloat(coord[0]), parseFloat(coord[1])]);
// };

const Map = ({ trails }: { trails: Trail[] }) => {
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

  useEffect(() => {
    console.log("Trails data:", trails);
  }, [trails]);

  return (
    <div className="relative w-full" style={{ height: "81vh" }}>
      <LoadScript googleMapsApiKey="AIzaSyAzKDwUofqEnwS6DHqoi2roaE6AaIR9FWA">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={{ lat: latitude, lng: longitude }}
          zoom={14}
        >
          <MyMarker lat={latitude} lng={longitude} />
          {trails.map((trail) => {
            const [lat, lng] = parseCoordinates(trail.coordinates);
            const route = trail.route; //parseRoute(trail.route);

            return (
              <React.Fragment key={trail.id}>
                <Marker
                  position={{ lat, lng }}
                  onClick={() => console.log(`Clicked on trail: ${trail.name}`)}
                />
                <Polyline
                  path={route.map(([lng, lat]) => ({ lat, lng }))}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                  }}
                />
              </React.Fragment>
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
