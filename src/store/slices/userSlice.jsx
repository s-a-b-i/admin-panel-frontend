import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    profileImage: null,
  },
  reducers: {
    updateUserProfile: (state, action) => {
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
    },
  },
});

export const { updateUserProfile } = userSlice.actions;
export default userSlice.reducer;