import React from "react";
import { useOutletContext } from "react-router-dom";
import { Card } from "../components/Card.jsx";

export const Home = () => {
    const { personajes, planetas, cargando } = useOutletContext() || {};

    if (cargando) {
        return <div className="text-center mt-5"><h3>Buscando las Esferas del Dragón...</h3></div>;
    }

    if (!cargando && (!personajes || personajes.length === 0)) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                <h4 className="alert-heading">¡Error!</h4>
                <p>No se pudieron cargar los personajes. Revisa la consola (F12).</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-primary">Personajes</h2>
            <div className="slider-container pb-3">
                {personajes.map(personaje => (
                    <Card key={personaje.id} item={personaje} type="characters" />
                ))}
            </div>

            <h2 className="text-primary espacio-superior-grande">Planetas</h2>
            <div className="slider-container pb-3">
                {planetas.map(planeta => (
                    <Card key={planeta.id} item={planeta} type="planets" />
                ))}
            </div>
        </div>
    );
};