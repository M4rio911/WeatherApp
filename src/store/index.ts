import Vuex, { StoreOptions } from "vuex";

import usersModule from "./users/index";
import weatherModule from "./weather/index";

export interface RootState {
  token: string,
  userId: string,
  tokenExpiration: string,
}


const store: StoreOptions<RootState> = {
  // state: {
  //   token: "asd",
  //   userId: "asd",
  //   tokenExpiration: "asd",
  // },
  modules:{
    users: usersModule,
    weather: weatherModule
  },
  // mutations: {
  //   asd(){
  //     console.log("asd");  
  //   },
    
  // },
  // actions:{
  // },
  // getters: {
  // }
};

export default new Vuex.Store<RootState>(store);
