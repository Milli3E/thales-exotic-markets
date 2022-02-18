import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import { Theme } from 'constants/ui';
import localStore from 'utils/localStore';
import { RootState } from '../rootReducer';

const sliceName = 'ui';

type UISliceState = {
    theme: Theme;
};

const initialState: UISliceState = {
    theme: localStore.get(LOCAL_STORAGE_KEYS.UI_THEME) || Theme.DARK,
};

export const uiSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<number>) => {
            state.theme = action.payload;
            localStore.set(LOCAL_STORAGE_KEYS.UI_THEME, action.payload);
        },
    },
});

export const { setTheme } = uiSlice.actions;

export const getUIState = (state: RootState) => state[sliceName];
export const getTheme = (state: RootState) => getUIState(state).theme;

export default uiSlice.reducer;
