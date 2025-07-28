import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
    // Aquí defino mis estados para guardar los datos y controlar la carga.
    const [personajes, setPersonajes] = useState([]);
    const [planetas, setPlanetas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Uso useEffect para que el código de adentro se ejecute solo una vez.
    useEffect(() => {
        // He definido mi función como 'async' para poder usar 'await'.
        const cargarDatos = async () => {
            // Hago la primera petición y espero ('await') su respuesta.
            // Añado un .catch() directamente para atrapar cualquier error de red.
            const respuestaPersonajes = await fetch("https://dragonball-api.com/api/characters")
                .catch(error => console.error("He detectado un error de red en personajes:", error));

            // Si la respuesta fue exitosa, la proceso.
            if (respuestaPersonajes && respuestaPersonajes.ok) {
                const datosPersonajes = await respuestaPersonajes.json();
                setPersonajes(datosPersonajes.items);
            }

            // Hago lo mismo para los planetas.
            const respuestaPlanetas = await fetch("https://dragonball-api.com/api/planets")
                .catch(error => console.error("He detectado un error de red en planetas:", error));

            if (respuestaPlanetas && respuestaPlanetas.ok) {
                const datosPlanetas = await respuestaPlanetas.json();
                setPlanetas(datosPlanetas.items);
            }

            // Al final de todo, marco la carga como completada.
            setCargando(false);
        };

        // Llamo a mi función para que empiece la carga.
        cargarDatos();
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
                {/* Paso los datos cargados a mis páginas hijas. */}
                <Outlet context={{ personajes, planetas, cargando }} />
            </main>
            <Footer />
        </div>
    );
};