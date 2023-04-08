export const INITIAL_STATE = {
    email:'',
    password:'',
    error:false,
    loading:false,
    username:'',
};

export const signupReducer= (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGED':
            return {...state, [action.payload.name]:action.payload.value, error:false};
        case 'SIGNUP_USER':
            return {...state, loading:true, error:false};
        case 'CLICK_INPUT':
            return {...state, error:false};
        case 'SIGNUP_USER_SUCCESS':
            return {...state, error:false, loading:false};
        case 'SIGNUP_USER_FAIL':
            return {...state, error:true, password:'', loading:false};
        default:
            return state;
    }
}