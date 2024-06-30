"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Map, { Trail } from "@/components/map";

export default function ExplorePage() {
  const [type, setType] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [distance, setDistance] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>("");
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    const fetchTrails = async () => {
      const response = await fetch("api/trails");
      const data: Trail[] = await response.json();
      setTrails(data);
    };

    fetchTrails();
  }, []);

  return (
    <div className="pt-16">
      <AppBar position="static">
        <Toolbar className="flex w-full bg-white space-x-4">
          <Typography variant="h6" className="hidden sm:block text-black">
            Explore trails
          </Typography>
          <div className="relative rounded-md bg-opacity-15 bg-black hover:bg-opacity-25 flex-grow sm:flex-grow-0 w-full sm:w-auto">
            <div className="absolute inset-y-0 right-0 pl-2 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: "text-inherit pl-2",
                input:
                  "pl-10 pr-2 py-1 w-full sm:transition-width duration-200 ease-in-out",
              }}
            />
          </div>
          <FormControl variant="outlined" className="w-32" size="small">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type"
            >
              <MenuItem value="hiking">Hiking</MenuItem>
              <MenuItem value="biking">Biking</MenuItem>
              <MenuItem value="walking">Walking</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="w-32" size="small">
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              label="Difficulty"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="w-32" size="small">
            <InputLabel id="distance-label">Distance</InputLabel>
            <Select
              labelId="distance-label"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              label="Distance"
            >
              <MenuItem value={10}>0-10 km</MenuItem>
              <MenuItem value={20}>0-20 km</MenuItem>
              <MenuItem value={50}>0-50 km</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
        <div className="md:col-span-1 overflow-y-auto">
          <div
            className="grid grid-cols-1 gap-4 overflow-x-auto whitespace-nowrap p-4"
            style={{ maxHeight: "calc(105vh - 200px)" }}
          >
            {trails.map((trail) => (
              <div
                key={trail.id}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`/images/trails/${trail.id}.jpg`}
                  alt={trail.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{trail.name}</h2>
                  <p className="text-sm text-gray-600">
                    {trail.type.charAt(0).toUpperCase() + trail.type.slice(1)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Difficulty: {trail.difficulty}
                  </p>
                  <p className="text-sm text-gray-600">
                    Distance: {trail.distance_km} km
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <Map trails={trails} />
        </div>
      </div>
    </div>
  );
}
