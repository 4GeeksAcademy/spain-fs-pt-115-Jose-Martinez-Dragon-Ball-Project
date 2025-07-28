import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

export const VistaDetalle = () => {

    const parametros = useParams();
    const idDelElemento = parametros.id;
    const ubicacion = useLocation();
    const categoria = ubicacion.pathname.split('/')[1];


    const [elemento, setElemento] = useState(null);

    useEffect(() => {

        fetch(`https://dragonball-api.com/api/${categoria}/${idDelElemento}`)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error("La respuesta de la API para el detalle no fue buena");
                }
                return respuesta.json();
            })
            .then(datos => {

                setElemento(datos);
            })
            .catch(error => {
                console.error("Error al buscar los detalles:", error);
            });
    }, [idDelElemento, categoria]);


    if (!elemento) {
        return <div className="text-center mt-5"><h1>Cargando...</h1></div>;
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-md-5">
                    <img src={elemento.image} className="img-fluid rounded shadow-lg" alt={elemento.name} />
                </div>
                <div className="col-12 col-md-7">
                    <h1 className="display-4">{elemento.name}</h1>
                    <p className="lead">{elemento.description}</p>
                    <hr className="my-4" />


                    {categoria === 'characters' && (
                        <div>
                            <h4>Ki: <span className="text-muted">{elemento.ki}</span></h4>
                            <h4>Raza: <span className="text-muted">{elemento.race}</span></h4>
                            <h4>Afiliación: <span className="text-muted">{elemento.affiliation}</span></h4>
                        </div>
                    )}
                    {categoria === 'planets' && (
                        <div>
                            <h4>¿Está destruido?: <span className="text-muted">{elemento.isDestroyed ? 'Sí' : 'No'}</span></h4>
                        </div>
                    )}

                    <Link to="/" className="btn btn-primary mt-3">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};