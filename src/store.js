const cargarFavoritosDesdeStorage = () => {
    const favoritosGuardados = localStorage.getItem('favoritos');


    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
};

export const initialStore = () => {
    return {
        characters: [],
        planets: [],

        favorites: cargarFavoritosDesdeStorage()
    };
};


const guardarFavoritosEnStorage = (favoritos) => {

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
};

export default function storeReducer(store, action = {}) {
    let nuevaStore;

    switch (action.type) {
        case 'ADD_FAVORITE':

            if (store.favorites.find(fav => fav.id === action.payload.id && fav.type === action.payload.type)) {
                return store;
            }

            nuevaStore = {
                ...store,
                favorites: [...store.favorites, action.payload]
            };
            guardarFavoritosEnStorage(nuevaStore.favorites);
            return nuevaStore;

        case 'REMOVE_FAVORITE':
            nuevaStore = {
                ...store,
                favorites: store.favorites.filter(
                    (item) => !(item.id === action.payload.id && item.type === action.payload.type)
                )
            };

            guardarFavoritosEnStorage(nuevaStore.favorites);
            return nuevaStore;

        default:
            return store;
    }
}