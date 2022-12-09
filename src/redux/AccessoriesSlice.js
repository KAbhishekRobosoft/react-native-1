import {createSlice} from '@reduxjs/toolkit';

const asseccoriesSlice = createSlice({
  name: 'shop',
  initialState: {
    bikeType: [],
    allBikeData: [],
    fliteredBikeData: [],
    selectedBikeData:[],
    serviceData: [],
  },

  reducers: {
    addBikeType: (state, action) => {
      state.bikeType = action.payload;
    },

    removeBikeType: (state) => {
      state.bikeType = [];
    },

    removeBikeData: (state) => {
      state.allBikeData = [];
    },

    addBikeData: (state, action) => {
      state.allBikeData = action.payload;
      state.fliteredBikeData = action.payload;
    },
    SelectedBike: (state, action) => {
      state.selectedBikeData = action.payload;   
    },
    fliteredBikeDetails: (state, action) => {
      state.allBikeData = state.fliteredBikeData.filter(
        ele => ele.vehicleType === action.payload,
      );
    },
    addAllServices: (state, action) => {
      state.serviceData = action.payload;
    }
  },
});
export const {
  fliteredBikeDetails,
  addAllServices,
  addBikeType,
  addBikeData,
  removeBikeType,
  removeBikeData
} = asseccoriesSlice.actions;
export default asseccoriesSlice.reducer;
