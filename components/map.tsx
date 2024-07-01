import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  Polyline,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

export interface Trail {
  id: number;
  name: string;
  type: "hiking" | "biking" | "walking";
  difficulty: "easy" | "medium" | "hard";
  distance_km: number;
  coordinates: string;
  image_url: string;
  route: [number, number][]; // Array of coordinates for the trail route
}

// Function to parse coordinates from string to number
const parseCoordinates = (coordinates: string): [number, number] => {
  const [lat, lng] = coordinates.split(",").map(Number);
  return [lat, lng]; // [latitude, longitude]
};

const Map = ({
  trails,
  onAddTrail,
  onDeleteTrail,
}: {
  trails: Trail[];
  onAddTrail: (lat: number, lng: number) => void;
  onDeleteTrail: (id: number) => void;
}) => {
  const [latitude, setLatitude] = useState(45.64861);
  const [longitude, setLongitude] = useState(25.60613);
  const [hoveredTrail, setHoveredTrail] = useState<Trail | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAzKDwUofqEnwS6DHqoi2roaE6AaIR9FWA",
  });

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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="relative w-full" style={{ height: "84vh" }}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={{ lat: latitude, lng: longitude }}
        zoom={14}
        onClick={(e) => {
          if (e.latLng) {
            // Funcția apelată la clic pe hartă, în cazul în care locația geografică este disponibilă.
            onAddTrail(e.latLng.lat(), e.latLng.lng()); // Apelarea funcției onAddTrail pentru a adăuga un nou traseu la coordonatele clicului.
          }
        }}
      >
        {trails.map((trail) => {
          const route = trail.route;
          const [lat, lng] = parseCoordinates(trail.coordinates);

          return (
            <React.Fragment key={trail.id}>
              <MarkerF
                position={{ lat, lng }}
                onMouseOver={() => setHoveredTrail(trail)}
                onMouseOut={() => setHoveredTrail(trail)}
                // onRightClick={() => onDeleteTrail(trail.id)}
              />
              {hoveredTrail && hoveredTrail.id === trail.id && (
                <InfoWindow
                  position={{ lat, lng }}
                  onCloseClick={() => setHoveredTrail(null)}
                >
                  <div>
                    <h2>{trail.name}</h2>
                    <p>Latitudine: {lat}</p>
                    <p>Longitudine: {lng}</p>
                  </div>
                </InfoWindow>
              )}
              <Polyline
                path={route.map(([lat, lng]) => ({ lat, lng }))}
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
    </div>
  );
};

export default Map;
