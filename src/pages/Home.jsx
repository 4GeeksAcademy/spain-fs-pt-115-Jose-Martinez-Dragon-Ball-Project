import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card } from "../components/Card.jsx";

export const Home = () => {
    // Recojo los datos que me pasa el componente Layout.
    const { personajes, planetas, cargando } = useOutletContext() || {};
    // Creo un estado local para el texto del buscador.
    const [terminoBusqueda, setTerminoBusqueda] = useState("");

    // Filtro mis listas de personajes y planetas en tiempo real.
    const personajesFiltrados = personajes.filter(p =>
        p.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    const planetasFiltrados = planetas.filter(p =>
        p.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );

    // Muestro un mensaje mientras los datos se están cargando.
    if (cargando) {
        return <div className="text-center mt-5"><h3>Buscando las Esferas del Dragón...</h3></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mb-5">
                <div className="col-12 col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Busca tu personaje o planeta favorito..."
                        value={terminoBusqueda}
                        onChange={e => setTerminoBusqueda(e.target.value)}
                    />
                </div>
            </div>

            <h2 className="text-primary">Personajes</h2>
            <div className="slider-container pb-3">
                {personajesFiltrados.length > 0 ? (
                    personajesFiltrados.map(personaje => (
                        <Card key={personaje.id} item={personaje} type="characters" />
                    ))
                ) : (
                    <p className="w-100 text-center">No he encontrado personajes con ese nombre.</p>
                )}
            </div>

            <h2 className="text-primary espacio-superior-grande">Planetas</h2>
            <div className="slider-container pb-3">
                {planetasFiltrados.length > 0 ? (
                    planetasFiltrados.map(planeta => (
                        <Card key={planeta.id} item={planeta} type="planets" />
                    ))
                ) : (
                    <p className="w-100 text-center">No he encontrado planetas con ese nombre.</p>
                )}
            </div>
        </div>
    );
};