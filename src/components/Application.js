import DayList from "components/DayList"
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment/index.js";
import axios from "axios";


const appointments = [
  {
    id: 1,
    time: "10pm",
  },
  {
    id: 2,
    time: "12pm",
  },
  {
    id: 3,
    time: "11pm",
  },
  {
    id: 4,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
      
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Kennethz",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer123123  ",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
      
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8001/api/days`).then(response=>setDays(response.data));
  },[])

  const appointmentList = appointments.map(appointment => {
    return     <Appointment
    id={appointment.id}
    time={appointment.time}
    interview={appointment.interview}
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
      days={days}
      day={day}
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
