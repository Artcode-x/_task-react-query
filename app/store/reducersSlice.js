/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  total_count: {},
}

const reducersSlice = createSlice({
  name: "reducers",
  initialState,
  reducers: {
    updateTotalCount: (state, action) => {
      state.total_count = action.payload
    },
  },
})

export const { updateTotalCount } = reducersSlice.actions
export default reducersSlice.reducer
