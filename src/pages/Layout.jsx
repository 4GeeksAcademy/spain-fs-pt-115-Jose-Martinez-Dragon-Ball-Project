import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
    const [personajes, setPersonajes] = useState([]);
    const [planetas, setPlanetas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("https://dragonball-api.com/api/characters"),
            fetch("https://dragonball-api.com/api/planets")
        ])
        .then(([respuestaPersonajes, respuestaPlanetas]) => {
            if (!respuestaPersonajes.ok || !respuestaPlanetas.ok) {
                throw new Error("La respuesta de la API no fue exitosa.");
            }
            return Promise.all([respuestaPersonajes.json(), respuestaPlanetas.json()]);
        })
        .then(([datosPersonajes, datosPlanetas]) => {
            setPersonajes(datosPersonajes.items);
            setPlanetas(datosPlanetas.items);
        })
        .catch((error) => {
            console.error("Ha ocurrido un error al cargar los datos desde el Layout:", error);
        })
        .finally(() => {
            setCargando(false);
        });
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
                <Outlet context={{ personajes, planetas, cargando }} />
            </main>
            <Footer />
        </div>
    );
};