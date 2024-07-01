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
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Map, { Trail } from "@/components/map";

export default function ExplorePage() {
  const [type, setType] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [distance, setDistance] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // State for new trail form
  const [newTrail, setNewTrail] = useState({
    name: "",
    type: "",
    difficulty: "",
    distance_km: 0,
    lat: 0,
    lng: 0,
  });

  const fetchTrails = async () => {
    // Funcție asincronă pentru a prelua traseele din API în funcție de filtrele setate.
    try {
      let query = `?distance=${distance}`;
      if (type) query += `&type=${type}`;
      if (difficulty) query += `&difficulty=${difficulty}`;
      if (searchTerm) query += `&search=${searchTerm}`;

      const response = await fetch(`api/trails${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch trails");
      }

      const data: Trail[] = await response.json();
      setTrails(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load trails. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTrails();
  }, [type, difficulty, distance, searchTerm]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTrail = async () => {
    try {
      const response = await fetch("api/trails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrail),
      });

      if (!response.ok) {
        throw new Error("Failed to add trail");
      }

      fetchTrails();
      handleClose();
    } catch (error) {
      console.error(error);
      setError("Failed to add trail. Please try again later.");
    }
  };

  const handleDeleteTrail = async (id: number) => {
    try {
      const response = await fetch(`api/trails/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete trail");
      }

      fetchTrails();
    } catch (error) {
      console.error(error);
      setError("Failed to delete trail. Please try again later.");
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setNewTrail({
      // Actualizarea datelor formularului pentru adăugarea traseului cu coordonatele clicului.
      ...newTrail,
      lat,
      lng,
    });
    handleClickOpen(); // Apelarea funcției pentru deschiderea dialogului de adăugare a traseului.
  };

  return (
    <div className="pt-16">
      <AppBar position="static">
        <Toolbar className="flex w-full bg-white space-x-4">
          <Typography variant="h6" className="hidden sm:block text-black">
            Explorează trasee
          </Typography>
          <div className="relative rounded-md bg-opacity-15 bg-black hover:bg-opacity-25 flex-grow sm:flex-grow-0 w-full sm:w-auto">
            <div className="absolute inset-y-0 right-0 pl-2 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Caută..."
              classes={{
                root: "text-inherit pl-2",
                input:
                  "pl-10 pr-2 py-1 w-full sm:transition-width duration-200 ease-in-out",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FormControl variant="outlined" className="w-32" size="small">
            <InputLabel id="type-label">Tip</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Tip"
            >
              <MenuItem value="">Toate</MenuItem>
              <MenuItem value="hiking">Drumeție</MenuItem>
              <MenuItem value="biking">Ciclism</MenuItem>
              <MenuItem value="walking">Plimbare</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="w-32" size="small">
            <InputLabel id="difficulty-label">Dificultate</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              label="Dificultate"
            >
              <MenuItem value="">Toate</MenuItem>
              <MenuItem value="easy">Ușor</MenuItem>
              <MenuItem value="medium">Mediu</MenuItem>
              <MenuItem value="hard">Greu</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="w-32" size="small">
            <InputLabel id="distance-label">Distanță</InputLabel>
            <Select
              labelId="distance-label"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              label="Distanță"
            >
              <MenuItem value={10}>0-10 km</MenuItem>
              <MenuItem value={20}>0-20 km</MenuItem>
              <MenuItem value={50}>0-50 km</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      {error && <div className="text-red-600 bg-red-100 p-4">{error}</div>}
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
                    Dificultate: {trail.difficulty}
                  </p>
                  <p className="text-sm text-gray-600">
                    Distanță: {trail.distance_km} km
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <Map
            trails={trails}
            onAddTrail={handleMapClick}
            onDeleteTrail={handleDeleteTrail}
          />
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adaugă Traseu</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nume"
            type="text"
            fullWidth
            value={newTrail.name}
            onChange={(e) => setNewTrail({ ...newTrail, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Tip"
            type="text"
            fullWidth
            value={newTrail.type}
            onChange={(e) => setNewTrail({ ...newTrail, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Dificultate"
            type="text"
            fullWidth
            value={newTrail.difficulty}
            onChange={(e) =>
              setNewTrail({ ...newTrail, difficulty: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Distanță (km)"
            type="number"
            fullWidth
            value={newTrail.distance_km}
            onChange={(e) =>
              setNewTrail({ ...newTrail, distance_km: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Latitudine"
            type="number"
            fullWidth
            value={newTrail.lat}
            onChange={(e) =>
              setNewTrail({ ...newTrail, lat: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Longitudine"
            type="number"
            fullWidth
            value={newTrail.lng}
            onChange={(e) =>
              setNewTrail({ ...newTrail, lng: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anulează
          </Button>
          <Button onClick={handleAddTrail} color="primary">
            Adaugă
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
