import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    avatar: null,
    countryCode: '+93',
    phoneNumber:'',
    buttonText: 'گرفتن کد تأیید',
    address:'',
    name: ''
  }

  export const userSlice = createSlice({
    name: 'keyVani',
    initialState,
    reducers: {
        setAvatar: (state, action)=>{
            state.avatar = action.payload
        },
        setName: (state, action)=>{
            state.name = action.payload
        },
        setAddress: (state, action) =>{
            state.address = action.payload
        },
        setCountryCode: (state, action) =>{
            state.countryCode = action.payload
        },
        setPhoneNumber:(state, action)=>{
            state.phoneNumber = action.payload
        },
        setButtonText: (state, action)=>{
            state.buttonText = action.payload
        }
    },
})

export const {setName, setAddress, setAvatar, setCountryCode, setPhoneNumber, setButtonText} = userSlice.actions
export default userSlice.reducer;