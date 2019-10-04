import DayList from "components/DayList"
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment/index.js";
import axios from "axios";
import { getAppointmentsForDay } from "components/helpers/selectors"
import { getInterview } from "components/helpers/selectors"
import { getInterviewersForDay } from "components/helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {},
    interview:{}
  });
  const setDay = day => setState({...state, day });
  const setDays = days => setState(prev =>({ ...prev, days }));
  const setAppointments = appointments => setState(prev =>({ ...prev, appointments }));
  const setInterviewers = interviewers => setState(prev =>({ ...prev, interviewers }));

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
    .then(() => {setState ({...state, appointments})
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
    .then(() => {setState ({...state, appointments})
    })
  };  
  
  useEffect(()=>{
  Promise.all([
    Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
    Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
    Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`))
  ]).then((all) => {
    setState(prev => ({...prev, days: setDays(all[0].data), appointments: setAppointments(all[1].data), interviewers:setInterviewers(all[2].data) }));
  });
}, [])  
    
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
    const appointmentList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return     <Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={interviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
  />
  })
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="/images/logo.png"
          alt="Interview Scheduler"
    />
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
    <DayList
      days={state.days}
      day={state.day}
      setDay={setDay}
    />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
