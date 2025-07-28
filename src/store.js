// He creado esta función para cargar los favoritos desde el localStorage
// al iniciar la aplicación. Así no se pierden.
const cargarFavoritosDesdeStorage = () => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
};

// Esta es la estructura inicial de mi store global.
export const initialStore = () => {
    return {
        favorites: cargarFavoritosDesdeStorage()
    };
};

// Y esta función guarda los favoritos en el localStorage.
const guardarFavoritosEnStorage = (favoritos) => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
};

// Este es mi 'reducer'. Es como un centro de control que recibe órdenes (actions)
// y modifica el estado global según la orden recibida.
export default function storeReducer(store, action = {}) {
    let nuevaStore;

    switch (action.type) {
        case 'ADD_FAVORITE':
            // Compruebo que no añado duplicados.
            if (store.favorites.find(fav => fav.id === action.payload.id && fav.type === action.payload.type)) {
                return store;
            }
            // Creo un nuevo estado con el favorito añadido.
            nuevaStore = {
                ...store,
                favorites: [...store.favorites, action.payload]
            };
            // Lo guardo en el localStorage.
            guardarFavoritosEnStorage(nuevaStore.favorites);
            return nuevaStore;

        case 'REMOVE_FAVORITE':
            // Creo un nuevo estado, pero filtrando para quitar el favorito.
            nuevaStore = {
                ...store,
                favorites: store.favorites.filter(
                    (item) => !(item.id === action.payload.id && item.type === action.payload.type)
                )
            // Aqui le pongo cuando guarda el storage de forma que queda la nuevaStore.
            };
            guardarFavoritosEnStorage(nuevaStore.favorites);
            return nuevaStore;

        default:
            return store;
    }
}