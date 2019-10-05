const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_UPDATE = "SET_UPDATE";

const reducers = {
  SET_DAY : (state, value) =>{
    return {...state, value}
  },

  SET_APPLICATION_DATA: (state, value) => {
    return {...state, value}
  },

  SET_UPDATE: (state, value) => {
    return {...state, value}

  }

}

function reducer(state, action) {
  return reducers[action.type](state, action.value)||state;
}


//[{type:SET_DAY, value:day }, {type:SET_APPLICATION_DATA, value: state}, {type:SET_APPLICATION_DATA, value: appointments}],