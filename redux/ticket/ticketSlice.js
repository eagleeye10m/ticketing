import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketService } from "./ticketService";
import { createNote } from "../notes/noteSlice";

export const createTicket = createAsyncThunk(
  "/ticket/create-ticket",
  async (ticketData, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      return await ticketService.createTicket(ticketData, userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const viewTickets = createAsyncThunk(
  "/ticket/view-tickets",
  async (data, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;

    try {
      console.log(userToken);
      return await ticketService.viewTickets(userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const viewAllTickets = createAsyncThunk(
  "/ticket/all-tickets",
  async (data, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      return await ticketService.viewAllTickets(userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTicket = createAsyncThunk(
  "/ticket/ticketID",
  async (ticketId, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      return await ticketService.getTicket(ticketId, userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const closeTicket = createAsyncThunk(
  "/ticket/closeticketID",
  async (ticketId, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      return await ticketService.closeTicket(ticketId, userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialState,
  reducers: {
    reset(state) {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        if (state.ticket && state.ticket._id === action.payload.ticket) {
          state.ticket.status = "open"; // Update the ticket status to 'open'
        }
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
        state.isSuccess = true;
      })

      .addCase(viewTickets.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(viewTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(viewTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);

        state.tickets = action.payload;
        state.isSuccess = true;
      })

      .addCase(viewAllTickets.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(viewAllTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(viewAllTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;

        state.isSuccess = true;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
        state.isSuccess = true;
      })
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
        state.isSuccess = true;
      });
  },
});
export const ticketActions = ticketSlice.actions;
export const ticketReducers = ticketSlice.reducer;
