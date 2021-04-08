import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default{
    namespaced: true,
    state() {
        return {
          activeUser: {
            isLogged: false,
            email: "",
            userId: "",
            userToken: "",
          },
          isAdded: false,
        };
      },
      mutations,
      actions,
      getters
    };