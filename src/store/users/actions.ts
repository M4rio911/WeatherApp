let timer: number;
import router from "@/router";

export default {
  async userLogReg({dispatch, commit}: any, payload: any) {
    const email = payload.email;
    const pass = payload.password;
    const mode = payload.mode;
    const regLink =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDW5uU63sMYrLEiL8kz9RKJnO8shVfh7Mk";
    const logLink =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDW5uU63sMYrLEiL8kz9RKJnO8shVfh7Mk";
    let activeLink = "";
    if (mode == "login") {
      activeLink = logLink;
    } else if (mode == "register") {
      activeLink = regLink;
    }

    const response = await fetch(activeLink, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      if(responseData.error.errors[0].message == "EMAIL_EXISTS"){
        const error = new Error('This email address is already taken');
        throw error;
      }else if(responseData.error.errors[0].message == "INVALID_PASSWORD"){
        const error = new Error('Invalid Password');
        throw error;
      }else if(responseData.error.errors[0].message == "INVALID_EMAIL"){
        const error = new Error('Invalid Email');
        throw error;
      }else if(responseData.error.errors[0].message == "MISSING_PASSWORD"){
        const error = new Error('Missing Password');
        throw error;
      };
      console.log(responseData);
      const error = new Error(responseData.error.errors[0].message || 'Failed to fetch!');
      throw error;
    }else{
      if (mode == "login") {
        const userId = responseData.localId;
        const userToken = responseData.idToken;
        const expirationTime = responseData.expiresIn * 1000; //3s

        //Prevent logout on refresh
        dispatch("localLogin",{userToken,userId,expirationTime,email});
        // AUTO LOGOUT
        dispatch("setLogout", expirationTime);

        commit("loginUser", {email, userId, userToken});
        dispatch("weather/userDataOnLogin",{userId, userToken}, {root:true});
        router.replace("/")
      } else if (mode == "register") {
        router.replace("/")
        commit("IsAddedChange");
      }
    }
  },
  logout(context:any){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("email");
    context.commit("logout");
    clearTimeout(timer);
  },
  setLogout(context: any, expirationTime: number){
    console.log(expirationTime/1000 + "s to logout");
    timer = setTimeout(() =>{
      context.dispatch("logout");
    }, expirationTime)
  },
  localLogin(_:any, payload:any){
    localStorage.setItem("token", payload.userToken);
    localStorage.setItem("userId", payload.userId);
    localStorage.setItem("email", payload.email);
    localStorage.setItem("expiresIn", new Date().getTime() + payload.expirationTime);
  },
  // ON START
  tryLogin({dispatch,commit}:any){
    const userToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const tokenExpiration:any = localStorage.getItem('expiresIn');
    if(userToken && userId && email){
      dispatch("setLogout", tokenExpiration - new Date().getTime());
      commit("loginUser",{email,userId,userToken});
      dispatch("weather/userDataOnLogin",{userId, userToken}, {root:true});
    }
  }
};
