

export const INITIAL_STATE = {
    email:'',
    password:'',
    error:false,
    loading:false,
    isLogin:false
};



export const signinReducer= (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGED':
            return {...state, [action.payload.name]:action.payload.value, error:false};
        case 'LOGIN_USER':
            return {...state, loading:true, error:false};
        case 'CLICK_INPUT':
            return {...state, error:false};
        case 'LOGIN_USER_SUCCESS':
            return {...state, isLogin:true ,error:false, loading:false};
        case 'LOGIN_USER_FAIL':
            return {...state, error:true, password:'', loading:false};
        default:
            return state;
    }
}