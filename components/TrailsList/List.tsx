// src/components/TrailsList/List.tsx
import React, { useState } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Grid,
  Box,
} from "@mui/material";
import TrailsDetails from "../TrailsDetails/TrailsDetails";

interface Trail {
  name: string;
  location?: string;
}

const TrailsList = () => {
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

  const trails: Trail[] = [
    { name: "Poiana Brasov" },
    { name: "Canionul 7 scari" },
    { name: "Pietrele lui Solomon" },
    { name: "Poiana Brasov" },
    { name: "Canionul 7 scari" },
    { name: "Pietrele lui Solomon" },
    { name: "Poiana Brasov" },
    { name: "Canionul 7 scari" },
    { name: "Pietrele lui Solomon" },
  ];

  return (
    <div className="p-4 bg-white overflow-auto h-[85vh]">
      <Typography variant="h4" className="mb-4">
        Trails Around You
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          onChange={(e) => setType(e.target.value as string)}
        >
          <MenuItem value="hiking">Hiking</MenuItem>
          <MenuItem value="biking">Biking</MenuItem>
          <MenuItem value="walking">Walking</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as string)}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Typography gutterBottom>Distance (km)</Typography>
        <Slider
          value={distance}
          onChange={handleDistanceChange}
          valueLabelDisplay="auto"
          min={0}
          max={50}
        />
      </Box>
      <Grid container spacing={3}>
        {trails.map((trail, i) => (
          <Grid item key={i} xs={12}>
            <TrailsDetails trail={trail} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TrailsList;
