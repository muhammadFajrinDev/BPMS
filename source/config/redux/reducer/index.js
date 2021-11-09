const initialState = {
    isLogin : false,
    isLoading : false,
}

const reducer = (state=initialState ,action) =>{
    if(action.type === 'CHANGE_ISLOGIN'){
      return {
        ...state,
        isLogin : action.value
      }
    }
    return state;
}

export default reducer;