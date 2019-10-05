import {useReducer, useEffect} from "react"
import axios from "axios"

export default function useApplicationdData () {

  const initialState={
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {},
    interview:{},
    spots:4
  }
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_UPDATE = "SET_UPDATE";


  const reducers = {
    SET_DAY : (state, value) =>{
      return {...state, day: value}
    },
    
    SET_APPLICATION_DATA: (state, value) => {
      return {...state, ...value}
    },
    
    SET_UPDATE: (state, value) => {
      return {...state, appointments:value}
      
    }

  }
  
  function reducer(state, action) {
    return reducers[action.type](state, action.value)||state;
  }

  
  const [state, dispatchState] = useReducer(reducer, initialState)
  
  const setDay = day => dispatchState({type:SET_DAY, value:day});
  // const setDays = days => dispatchState({type:SET_DAY, value:days});
  // const setAppointments = appointments => dispatchState({type:SET_DAY, value:appointments});
  // const setInterviewers = interviewers => dispatchState({type:SET_DAY, value:interviewers});
  
  const bookInterview= function (id,interview) {


    const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  
    return Promise.resolve(axios.put(`http://localhost:8001/api/appointments/${id}`,appointments[id]))
    .then(() => {dispatchState({type:SET_UPDATE, value: appointments})
    })
  };
  
  const cancelInterview= function (id, interview) {
    const appointment = {
    ...state.appointments[id],
    interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  
    return Promise.resolve(axios.delete(`http://localhost:8001/api/appointments/${id}`,appointments[id].interview))
    .then(() => {dispatchState({type:SET_UPDATE, value: appointments})
    })
  };  
  
  useEffect(()=>{
  Promise.all([
    Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
    Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
    Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`))
  ]).then((all) => {
    dispatchState({type:SET_APPLICATION_DATA, value: {days: all[0].data, appointments: all[1].data, interviewers:all[2].data} })
  });
  }, [] ) 

  return {state, setDay, bookInterview, cancelInterview}
}


