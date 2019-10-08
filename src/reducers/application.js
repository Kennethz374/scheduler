export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_UPDATE = "SET_UPDATE";
export const SET_SPOTS= "SET_SPOTS";

  

export const reducers = {
    SET_DAY : (state, value) =>{
      return {...state, day: value}
    },
    
    SET_APPLICATION_DATA: (state, value) => {
      return {...state, ...value}
    },
    
    SET_UPDATE: (state, value) => {

      return {...state, appointments:value}
    },
    SET_SPOTS: (state, value) => {
      return {...state, days:value}
    }

  }

 export function reducer(state, action) {
    return reducers[action.type](state, action.value)||state;
  }