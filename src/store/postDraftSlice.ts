import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostCategory } from "@/types/post";

export type PostDraftState = {
  title: string;
  category: PostCategory;
  audioBlobUrl: string | null;
};

const initialState: PostDraftState = {
  title: "",
  category: "voicenote",
  audioBlobUrl: null,
};

export const postDraftSlice = createSlice({
  name: "postDraft",
  initialState,
  reducers: {
    setDraft: (state, action: PayloadAction<Partial<PostDraftState>>) => {
      Object.assign(state, action.payload);
    },
    clearDraft: () => initialState,
  },
});

export const { setDraft, clearDraft } = postDraftSlice.actions;

export default postDraftSlice.reducer;
