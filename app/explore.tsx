"use client";
import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import TrailsList from "@/components/TrailsList/List";
import { useState } from "react";
import Map from "@/components/map";

export default function ExplorePage() {
  const [type, setType] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [distance, setDistance] = useState<number[]>([0, 10]);
  const [difficulty, setDifficulty] = useState<string>("");

  const handleDistanceChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(newValue)) {
      setDistance(newValue);
    }
  };

  // This would be replaced by actual loading logic
  const isLoading = false;

  return (
    <div className="pt-16">
      <AppBar position="static">
        <Toolbar className="flex w-full justify-between bg-white">
          <Box display="flex" className="space-x-4 flex-grow">
            <Typography variant="h6" className="hidden sm:block text-black">
              Explore trails
            </Typography>
            <div className="relative rounded-md bg-opacity-15 bg-black hover:bg-opacity-25 mx-0 sm:ml-8 sm:mr-2 flex-grow sm:flex-grow-0 w-full sm:w-auto">
              <div className="absolute inset-y-0 right-0 pl-2 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: "text-inherit pl-2",
                  input:
                    "pl-10 pr-2 py-1 w-full sm:w-auto transition-width duration-200 ease-in-out md:w-52",
                }}
              />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <div className="grid grid-cols-1 md:grid-cols-4 ">
        <div className="md:col-span-1">
          <TrailsList />
        </div>
        <div className="md:col-span-3">
          <Map />
        </div>
      </div>
    </div>
  );
}
