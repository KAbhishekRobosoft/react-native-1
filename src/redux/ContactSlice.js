import {createSlice} from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contactsData: [],
    filterData: [],
    addTripContacts: [],
  },

  reducers: {
    selectContacts: (state, action) => {
      state.contactsData = action.payload;
      state.filterData = action.payload;
    },

    selectMarked: (state, action) => {
      state.contactsData = state.contactsData.map(ele => {
        if (ele.recordID === action.payload.recordID) {
          return {
            ...ele,
            givenName: action.payload.givenName,
            marked: true,
            recordID: action.payload.recordID,
          };
        }
        return ele;
      });
      state.filterData = state.filterData.map(ele => {
        if (ele.recordID === action.payload.recordID) {
          return {
            ...ele,
            givenName: action.payload.givenName,
            marked: true,
            recordID: action.payload.recordID,
          };
        }
        return ele;
      });
    },

    selectUnMarked: (state, action) => {
      state.contactsData = state.contactsData.map(ele => {
        if (ele.recordID === action.payload.recordID) {
          return {
            ...ele,
            givenName: action.payload.givenName,
            marked: false,
            recordID: action.payload.recordID,
          };
        }
        return ele;
      });
      state.filterData = state.filterData.map(ele => {
        if (ele.recordID === action.payload.recordID) {
          return {
            ...ele,
            givenName: action.payload.givenName,
            marked: false,
            recordID: action.payload.recordID,
          };
        }
        return ele;
      });
    },
    filterContacts: (state, action) => {
      state.contactsData = state.filterData.filter(site =>
        site.givenName.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },

    addTripContacts: (state, action) => {
      state.addTripContacts.push(action.payload);
    },

    deleteTripContacts: (state, action) => {
      state.addTripContacts = state.addTripContacts.filter(
        ele => ele.id !== action.payload.id,
      );
    },
    deleteAllTripContacts: (state) => {
      state.addTripContacts = [];
    },
    deleteContactsData: (state, action) => {
      state.contactsData = [];
    },
  },
});

export const {
  selectContacts,
  selectMarked,
  selectUnMarked,
  filterContacts,
  addTripContacts,
  deleteTripContacts,
  deleteAllTripContacts,
  deleteContactsData,
} = contactSlice.actions;

export default contactSlice.reducer;
