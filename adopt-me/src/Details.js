import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Caroussel from "./Caroussel";
import ThemeContext from "./ThemeContext";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

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
  const [theme] = useContext(ThemeContext);
  const [showModal, updateShowModal] = useState(false);

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
        <button
          style={{ backgroundColor: theme }}
          onClick={() => updateShowModal(!showModal)}
        >
          Adopt {name}
        </button>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={() => window.location = "http://bit.ly/pet-adopt"}>Yes</button>
                <button onClick={() => updateShowModal(!showModal)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
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
