import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

export const VistaDetalle = () => {
    // Obtengo los datos de la URL que necesito para mi petición.
    const { id } = useParams();
    const location = useLocation();
    
    // Mis estados para guardar el elemento y controlar la carga.
    const [elemento, setElemento] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // He creado una función async para cargar los detalles.
        const cargarDetalles = async () => {
            const categoria = location.pathname.split('/')[1];
            
            // Hago la petición y espero la respuesta, manejando el error con .catch().
            const respuesta = await fetch(`https://dragonball-api.com/api/${categoria}/${id}`)
                .catch(error => console.error("He detectado un error de red en detalle:", error));

            if (respuesta && respuesta.ok) {
                const datos = await respuesta.json();
                setElemento(datos);
            } else {
                setElemento(null);
            }
            setCargando(false);
        };

        cargarDetalles();
    }, [id, location.pathname]);

    // Lógica para renderizar los valores de forma correcta.
    const renderizarValor = (clave, valor) => {
        if (clave === 'originPlanet' && typeof valor === 'object' && valor !== null) return valor.name;
        // Para los desplegables, no necesito hacer nada especial aquí, lo haré en el JSX.
        return String(valor);
    };

    if (cargando) return <div className="text-center mt-5"><h1>Cargando...</h1></div>;
    if (!elemento) return <div className="text-center mt-5"><h1>Elemento no encontrado</h1></div>;
    
    // Filtro las propiedades que no quiero mostrar en la ficha técnica.
    const propiedadesAIgnorar = ['id', 'name', 'description', 'image', 'deletedAt'];
    const detallesExtra = Object.entries(elemento).filter(
        ([key]) => !propiedadesAIgnorar.includes(key) && elemento[key]
    );

    return (
        <div className="container my-5">
            <div className="vista-detalle-wrapper p-4 p-md-5">
                <div className="row">
                    <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
                        <img src={elemento.image} className="img-fluid rounded shadow-lg" alt={elemento.name} style={{ maxHeight: '600px' }}/>
                    </div>
                    <div className="col-12 col-md-7">
                        <h1 className="display-4">{elemento.name}</h1>
                        <p className="lead text-muted">{elemento.description}</p>
                        <hr className="my-4" />
                        <h3 className="mb-3">Ficha Técnica</h3>
                        <div className="row g-3">
                            {detallesExtra.map(([clave, valor]) => {
                                // Si el valor es un array (como transformaciones o personajes), uso un desplegable (acordeón).
                                if (Array.isArray(valor)) {
                                    return (
                                        <div className="col-12" key={clave}>
                                            <div className="accordion accordion-flush" id={`accordion-${clave}`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${clave}`}>
                                                            {clave.replace(/([A-Z])/g, ' $1')} ({valor.length})
                                                        </button>
                                                    </h2>
                                                    <div id={`collapse-${clave}`} className="accordion-collapse collapse" data-bs-parent={`#accordion-${clave}`}>
                                                        <div className="accordion-body">
                                                            <ul className="list-group">
                                                                {valor.length > 0 ? valor.map(item => <li key={item.id || item.name} className="list-group-item">{item.name}</li>) : "Ninguno"}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    // Si es un valor simple, uso una tarjeta de propiedad. Buscado internet...
                                    return (
                                        <div className="col-12 col-md-6" key={clave}>
                                            <div className="card card-propiedad">
                                                <div className="card-body">
                                                    <h6 className="card-subtitle mb-2 text-muted text-capitalize">{clave.replace(/([A-Z])/g, ' $1')}</h6>
                                                    <p className="card-text fs-5">{renderizarValor(clave, valor)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                         <Link to="/" className="btn btn-primary mt-4 align-self-start">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};