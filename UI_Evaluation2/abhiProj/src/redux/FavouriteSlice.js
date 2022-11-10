import {createSlice} from '@reduxjs/toolkit';

//Creation of initial state for reducer
const addFavourites = createSlice({
  name: 'site',
  initialState: {
    recentPlace: {},
    searchedPlace: [],
    tempsearchedPlace: [],
    favourites: [],
    tempFavourites: [],
    initialPlace: 'udupi',
    isLoading:true
  },

  reducers: {
    addFavourite: (state, action) => {
      const found = state.favourites.some(
        el => el.place === action.payload.place,
      );
      if (!found) {
        state.favourites.push(action.payload);
        state.tempFavourites.push(action.payload);
      } else {
        alert('Already added to favourites');
      }
    },

    emptyFavourite: state => {
      state.favourites = [];
      state.tempFavourites = [];
    },

    filterFavourite:(state,action)=>{
      state.favourites= state.tempFavourites.filter(ele => ele.place.toLowerCase().includes(action.payload.toLowerCase()))
   },

   filterSearched:(state,action)=>{
    state.searchedPlace= state.tempsearchedPlace.filter(ele => ele.place.toLowerCase().includes(action.payload.toLowerCase()))
 },

    addRecentPlace: (state, action) => {
      state.recentPlace = action.payload;
      const found = state.searchedPlace.some(
        el => el.place === action.payload.place,
      );
      if (!found) {
        state.searchedPlace.push(action.payload);
        state.tempsearchedPlace.push(action.payload);
      }
      state.isLoading = false;
    },

    editSearchedPlace: (state, action) => {
      state.searchedPlace= state.searchedPlace.map(ele => {
        if (ele.id === action.payload.id) {
          return {
            ...ele,
            place:  action.payload.place,
            temp:  parseInt(action.payload.temp),
            tempMin: parseInt(action.payload.temp_min),
            tempMax: parseInt( action.payload.temp_max),
            status:  action.payload.status,
            humidity: action.payload.humidity,
            visibility: action.payload.visibility,
            rain: action.payload.rain,
            favourite: true,
          };
        }
        return ele
      });
      state.tempsearchedPlace= state.searchedPlace
    },

    setInit: (state,action) => {
      state.isLoading= true,
      state.initialPlace = action.payload
    },
  },
});

export const {
  addFavourite,
  emptyFavourite,
  addRecentPlace,
  editSearchedPlace,
  setInit,
  filterFavourite,
  filterSearched
} = addFavourites.actions;
export const reducer = addFavourites.reducer;
