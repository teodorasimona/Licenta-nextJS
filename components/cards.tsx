import React from "react";

export function Cards1() {
  return (
    <div className="bg-white">
      <p className="text-[33px] px-6 lg:px-36 font-semibold text-black pt-12 pb-2">
        Trasee populare langa Brasov
      </p>
      <div className="flex flex-wrap justify-center lg:justify-between pb-4 px-4 lg:px-32 gap-4">
        <TrailCard
          imageUrl="/images/drumul-serpentinelor.webp"
          title="Mt Tampa via Drumul Serpentinelor"
          location="Braşov, Braşov, Romania"
          dificulty="Moderate"
          rating={4.6}
          reviewsCount={187}
        />

        <TrailCard
          imageUrl="/images/poiana-stanii.webp"
          title="Poiana Stanii"
          location="Sacele, Braşov, Romania"
          dificulty="Moderate"
          rating={4.3}
          reviewsCount={169}
        />

        <TrailCard
          imageUrl="/images/canionul-7-scari.webp"
          title="Canionul 7 scari"
          location="Brasov, Braşov, Romania"
          dificulty="Moderate"
          rating={4.5}
          reviewsCount={101}
        />

        <TrailCard
          imageUrl="/images/cabana-caraiman.webp"
          title="Cabana Caraiman"
          location="Brasov, Braşov, Romania"
          dificulty="Moderate"
          rating={4.1}
          reviewsCount={88}
        />
      </div>
    </div>
  );
}

interface TrailCardProps {
  imageUrl: string;
  title: string;
  location: string;
  dificulty: string;
  rating: number;
  reviewsCount: number;
}

function TrailCard({
  imageUrl,
  title,
  location,
  dificulty,
  rating,
  reviewsCount,
}: TrailCardProps) {
  return (
    <div className="w-full lg:w-1/4 p-4 max-w-sm rounded-lg shadow-lg">
      <a href="#">
        <img
          className="rounded-lg w-full h-[236px] object-cover"
          src={imageUrl}
          alt="card image"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-black">
            {title}
          </h5>
        </a>

        <p className="mb-3 font-normal text-black">
          {location} <br />
          {dificulty} • {rating.toFixed(1)} ({reviewsCount})
        </p>
      </div>
    </div>
  );
}

export function Cards2() {
  return (
    <div className="bg-white">
      <p className="text-[33px] px-6 lg:px-36 font-semibold text-black pt-12 pb-2">
        Cele mai frumoase privelisti din apropiere
      </p>
      <div className="flex flex-wrap justify-center lg:justify-between pb-4 px-4 lg:px-32 gap-4">
        <Views
          imageUrl="/images/cabana-plaiul-foii.webp"
          title="Cabana Plaiul Foii-La Lanțuri-Șaua Grindului"
          location="Zarnesti, Braşov, Romania"
          rating={4.8}
          distance={14.5}
          dificulty="Hard"
        />

        <Views
          imageUrl="/images/cabana-piatra-arsa.webp"
          title="Busteni - Cabana Piatra Arsa"
          location="Busteni, Braşov, Romania"
          rating={4.8}
          distance={8.2}
          dificulty="Hard"
        />
        <Views
          imageUrl="/images/cabana-curmatura.webp"
          title="Piatra Craiului: Cabana Curmătura, Șaua Crăpăturii - Vf. Ascuțit"
          location="Zarnesti, Braşov, Romania"
          rating={4.8}
          distance={6.1}
          dificulty="Hard"
        />
        <Views
          imageUrl="/images/prapastiile-zarnestilor.webp"
          title="Prăpăstiile Zărneștilor-Cabana Curmătura"
          location="Moieciu, Braşov, Romania"
          rating={4.3}
          distance={2.7}
          dificulty="Easy"
        />
      </div>
    </div>
  );
}

interface ViewsProps {
  imageUrl: string;
  title: string;
  location: string;
  rating: number;
  distance: number;
  dificulty: string;
}

function Views({
  imageUrl,
  title,
  location,
  rating,
  distance,
  dificulty,
}: ViewsProps) {
  return (
    <div className="w-full lg:w-1/4 p-4 max-w-sm rounded-lg shadow-lg">
      <a href="#">
        <img
          className="rounded-lg w-full h-[236px] object-cover"
          src={imageUrl}
          alt="card image"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-black">
            {title}
          </h5>
        </a>

        <p className="mb-3 font-normal text-black">
          {location} <br />
          {rating.toFixed(1)} • {distance.toFixed(1)} km • {dificulty}
        </p>
      </div>
    </div>
  );
}
