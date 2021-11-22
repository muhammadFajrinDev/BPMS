const initialState = {
    isLogin : false,
    isLoading : false,
    isLoadingFull: false,
    badminton_union: null,
    currentUnion: null,
    user: {},
}

const reducer = (state=initialState ,action) =>{
    if(action.type === 'CHANGE_ISLOGIN'){
      return {
        ...state,
        isLogin : action.value
      }
    }
    if(action.type === 'CHANGE_ISLOADING'){
      return {
        ...state,
        isLoading : action.value
      }
    }
    if(action.type === 'CHANGE_ISLOADINGFULL'){
      return {
        ...state,
        isLoadingFull : action.value
      }
    }
    if(action.type === 'CHANGE_UNION'){
      return {
        ...state,
        badminton_union : action.value
      }
    }
    if(action.type === 'CHANGE_USER'){
      return {
        ...state,
        user : action.value
      }
    }
    if(action.type === 'CHANGE_CURRENT_UNION'){
      return {
        ...state,
        currentUnion : action.value
      }
    }
    return state;
}

export default reducer;