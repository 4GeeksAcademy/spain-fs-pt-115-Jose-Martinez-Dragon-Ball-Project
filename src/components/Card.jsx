import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';


export const Card = ({ item, type }) => {

    const { store, dispatch } = useGlobalReducer();

    const esFavorito = store.favorites.some(fav => fav.id === item.id && fav.type === type);


    const manejarClickFavorito = () => {

        const payloadDelFavorito = { ...item, type: type };

        if (esFavorito) {

            dispatch({ type: 'REMOVE_FAVORITE', payload: payloadDelFavorito });
        } else {

            dispatch({ type: 'ADD_FAVORITE', payload: payloadDelFavorito });
        }
    };

    return (

        <div className="card m-2" style={{ minWidth: '18rem' }}>


            <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                style={{ height: '300px', objectFit: 'cover' }}
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>


                <div className="d-flex justify-content-between mt-auto">


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