import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-4 sticky-top">
            <div className="container-fluid">
                <Link to="/">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Dragon_Ball_Z_logo.svg" 
                        alt="Logo de Dragon Ball Z" 
                        style={{ height: '50px' }}
                    />
                </Link>
                <div className="dropdown">
                    <button 
                        className="btn btn-warning dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        Favoritos <span className="badge bg-dark">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item text-center">(Vacío)</li>
                        ) : (
                            store.favorites.map((favorito) => (
                                <li key={`${favorito.type}-${favorito.id}`} className="dropdown-item d-flex justify-content-between align-items-center">
                                    <Link to={`/${favorito.type}/${favorito.id}`} className="text-decoration-none text-dark">
                                        {favorito.name}
                                    </Link>
                                    <button 
                                        className="btn btn-sm"
                                        onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: favorito })}
                                    >
                                        <i className="fas fa-trash text-danger"></i>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};