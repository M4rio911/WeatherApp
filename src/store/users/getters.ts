export default{
    isLogged(state: any){
        return state.activeUser.isLogged;
    },
    activeUserMail(state: any){
        return state.activeUser.email;
    },
    activeUserId(state: any){
        return state.activeUser.userId;
    },
    activeUserToken(state: any){
        return state.activeUser.userToken;
    },
    isAdded(state:any){
        return state.isAdded;
    }
}