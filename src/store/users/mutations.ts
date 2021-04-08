import router from "@/router";
export default {
  loginUser(state: any, payload: any) {
    state.activeUser.isLogged = true;
    state.activeUser.email = payload.email;
    state.activeUser.userId = payload.userId;
    state.activeUser.userToken = payload.userToken;
  },
  logout(state: any) {
    state.activeUser.isLogged = false;
    state.activeUser.email = "";
    state.activeUser.password = "";
    state.activeUser.userId = "";
    state.activeUser.userToken = "";
    router.replace("/");
  },
  IsAddedChange(state: any) {
    state.isAdded = true;
    setTimeout(() => {
      state.isAdded = false;
    }, 5000);
  },
};
