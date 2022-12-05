import {createSlice} from '@reduxjs/toolkit';

const milestoneSlice = createSlice({
  name: 'contact',
  initialState: {
    mileStone: false,
    otherMilestone: false,
    milestoneData: [],
    isLoading: true,
    setTo: '',
    storeTrip: {},
    initialState: false,
  },

  reducers: {
    setMileStone: (state, action) => {
      state.mileStone = action.payload;
    },
    setMileStoneData: (state, action) => {
      state.milestoneData.push(action.payload);
      state.mileStone = true;
    },

    setLoading: state => {
      state.isLoading = false;
    },

    deSetLoading: state => {
      state.isLoading = true;
    },
    whereTo: (state, action) => {
      state.setTo = action.payload;
    },
    tripStore: (state, action) => {
      state.storeTrip = action.payload;
    },
    deleteMilestonesData: (state, action) => {
      state.milestoneData = [];
    },
    deleteStoreTrip: (state, action) => {
      state.storeTrip = {};
    },
    setInitialState: (state, action) => {
      state.initialState = !action.payload
    },
    emptySetTo: (state, action) => {
      state.setTo = ''
    }
  },
});

export const {
  setMileStone,
  setMileStoneData,
  setLoading,
  deSetLoading,
  whereTo,
  tripStore,
  deleteMilestonesData,
  deleteStoreTrip,
  setInitialState,
  emptySetTo,
} = milestoneSlice.actions;
export default milestoneSlice.reducer;
