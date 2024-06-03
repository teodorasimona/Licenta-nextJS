import React from "react";

interface Trail {
  name: string;
  location?: string;
}

interface TrailsDetailsProps {
  trail: Trail;
}

const TrailsDetails: React.FC<TrailsDetailsProps> = ({ trail }) => {
  return <h1>{trail.name}</h1>;
};

export default TrailsDetails;
