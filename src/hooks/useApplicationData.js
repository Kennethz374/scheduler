import {useReducer, useEffect} from "react"
import axios from "axios"
import {SET_APPLICATION_DATA, SET_DAY, SET_SPOTS, SET_UPDATE, reducer} from "reducers/application"

export default function useApplicationdData () {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    interview:{},
    spots:4
  }
  
  const [state, dispatchState] = useReducer(reducer, initialState)

  
  const setDay = day => dispatchState({type:SET_DAY, value:day});
  
  const bookInterview= function (id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  
    const spotsLeft = (day) => {
      return day.appointments.length - day.appointments.reduce((numOfBooked, id) => (appointments[id].interview? numOfBooked + 1: numOfBooked), 0)
    }
    const days = state.days.map(day=> {
        return {...day, spots: spotsLeft(day)}
 
          
    })
    return Promise.resolve(axios.put(`http://localhost:8001/api/appointments/${id}`,appointments[id]))
    .then(()=> {dispatchState({type:SET_SPOTS,value:days})})    
    .then(() => {dispatchState({type:SET_UPDATE, value: appointments})})
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

    const spotsLeft = (day) => {
      return day.appointments.length - day.appointments.reduce((numOfBooked, id) => (appointments[id].interview? numOfBooked + 1: numOfBooked), 0)
    }
    const days = state.days.map(day=> {
        return {...day, spots: spotsLeft(day)}
    })
    return Promise.resolve(axios.delete(`http://localhost:8001/api/appointments/${id}`,appointments[id].interview))
    .then(()=> {dispatchState({type:SET_SPOTS,value:days})})   
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


