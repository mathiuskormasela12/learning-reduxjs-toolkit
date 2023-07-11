// ========== User
// import all modules
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface IInitialState {
  users: Array<{ username: string, password: string }>
  loading: boolean
}

const initialState: IInitialState = {
  users: [],
  loading: false
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  try {
    const res = await fetch(`${String(import.meta.env?.VITE_API_URL ?? '')}/api/users`)
    const { data } = await res.json()
    return data
  } catch (err) {
    const error = err as { message: string }
    throw new Error(error.message)
  }
})

export const addUser = createAsyncThunk('users/addUser', async (data: { username: string, password: string }) => {
  try {
    const res = await fetch(`${String(import.meta.env?.VITE_API_URL ?? '')}/api/users`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    await res.json()
  } catch (err) {
    const error = err as { message: string }
    throw new Error(error.message)
  }
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUser (state) {
      state.users = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
    })

    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false
      state.users = []
    })

    builder.addCase(addUser.pending, (state) => {
      state.loading = true
    })

    builder.addCase(addUser.fulfilled, (state) => {
      state.loading = false
    })

    builder.addCase(addUser.rejected, (state) => {
      state.loading = false
    })
  }
})

export const { resetUser } = userSlice.actions
export default userSlice.reducer
