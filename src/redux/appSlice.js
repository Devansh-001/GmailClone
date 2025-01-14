import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        open: false,
        emails: [],
        selectedEmail: null,
        searchText: "",
        user: null,
        googleAppsOpen: false,
        selectedMessages: [],
        starred: [],
        receivedMails: [],
        allSelected: false,
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setGoogleAppsOpen: (state, action) => {
            state.googleAppsOpen = action.payload;
        },
        setSelectedMessages: (state, action) => {
            state.selectedMessages = action.payload;
        }
        ,
        setStarred: (state, action) => {
            state.starred = action.payload;
        },
        setReceivedMails: (state, action) => {
            state.receivedMails = action.payload;
        },
        setAllSelected: (state, action) => {
            state.allSelected = action.payload;
        }

    }
});

export const { setOpen, setEmails, setSelectedEmail, setSearchText, setUser, setGoogleAppsOpen, setSelectedMessages, setStarred, setReceivedMails, setAllSelected } = appSlice.actions;

export default appSlice.reducer;