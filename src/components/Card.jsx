import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Card = ({ item, type }) => {
    // Me conecto a la store global para poder manejar los favoritos.
    const { store, dispatch } = useGlobalReducer();
    
    // Compruebo si este item ya está en mi lista de favoritos.
    const esFavorito = store.favorites.some(fav => fav.id === item.id && fav.type === type);

    // La función que se ejecuta al pulsar el corazón.
    const manejarClickFavorito = () => {
        const payload = { ...item, type };
        // Dependiendo de si ya es favorito, envío una orden (dispatch) para añadirlo o quitarlo.
        if (esFavorito) {
            dispatch({ type: 'REMOVE_FAVORITE', payload });
        } else {
            dispatch({ type: 'ADD_FAVORITE', payload });
        }
    };

    return (
        <div className="card">
            <img src={item.image} className="card-img-top" alt={item.name} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between mt-auto">
                    {/* Uso el componente Link para navegar a la vista de detalle sin recargar la página. */}
                    <Link to={`/${type}/${item.id}`} className="btn btn-outline-primary">
                        Saber más
                    </Link>
                    <button className="btn btn-outline-warning" onClick={manejarClickFavorito}>
                        <i className={`fa-heart ${esFavorito ? 'fas text-danger' : 'far'}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};