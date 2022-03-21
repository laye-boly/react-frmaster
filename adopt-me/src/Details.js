import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Caroussel from "./Caroussel";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [city, updateCity] = useState("");
  const [state, updateState] = useState("");
  const [description, updateDescription] = useState("");
  const [name, updateName] = useState("");
  const [loading, updateLoading] = useState(true);
  const [images, updateImages] = useState([]);
  const params = useParams();
  useEffect(() => {
    loadDetails();
  }, []);

  async function loadDetails() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${params.id}`);
    const json = await res.json();
    updateLoading(false);
    updateAnimal(json.pets[0].animal);
    updateBreed(json.pets[0].breed);
    updateCity(json.pets[0].city);
    updateState(json.pets[0].state);
    updateDescription(json.pets[0].description);
    updateName(json.pets[0].name);
    updateImages(json.pets[0].images);
  }

  if (loading) {
    return <h2>loading … </h2>;
  }

  return (
    <div className="details">
      <Caroussel images={images} />
      <div>
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
        <button>Adopt {name}</button>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
