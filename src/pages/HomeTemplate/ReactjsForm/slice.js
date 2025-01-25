import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listStudents: [],
  cacheListStudents: [],
  isEdit: false,
};

const reactjsForm = createSlice({
  name: "reactjsForm",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      console.log(state.listStudents);

      state.listStudents = [...state.listStudents, action.payload];
      state.cacheListStudents = [...state.cacheListStudents, action.payload];
    },
    deleteStudent: (state, action) => {
      const newData = state.listStudents.filter(
        (item) => item.id !== action.payload.id
      );
      state.listStudents = newData;
      state.cacheListStudents = newData;
    },
    editStudent: (state, action) => {
      const index = state.listStudents.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.listStudents[index] = action.payload;
        state.cacheListStudents[index] = action.payload;
      }
    },
    updateStatus: (state, action) => {
      state.isEdit = action.payload;
    },
    getLocalStorage: (state, action) => {
      state.listStudents = action.payload;
      state.cacheListStudents = action.payload;
    },

    searchName: (state, action) => {
      state.listStudents = action.payload;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  getLocalStorage,
  editStudent,
  updateStatus,
  searchName,
} = reactjsForm.actions;

export default reactjsForm.reducer;
