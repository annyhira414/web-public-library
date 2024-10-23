import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAuthors {
  id: number;
  full_name: string;
}

interface Ilibrary {
  code: string;
  id: number;
  name: string;
}

interface IbagData {
  authors: IAuthors[];
  biblio_id: number;
  id: number;
  image_url: {
    desktop_image: string;
    tab_image: string;
  };
  slug: string;
  title: string;
  isAvailable?: boolean;
  available_libraries?: Ilibrary[];
}

export interface BagState {
  data: IbagData[];
}

const initialState: BagState = {
  data: [],
};

export const BagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addtoBag: (state, action: PayloadAction<IbagData[]>) => {
      state.data = action?.payload;
    },
    crearBag: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtoBag, crearBag } = BagSlice.actions;

export default BagSlice.reducer;
