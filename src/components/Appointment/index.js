// import Appointment from "components/Appointment"; \
import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"


export default function Appointment(props) {
  return  <article classNmae="appointment">
  <Header time={props.time}/>
  {props.interview? <Show student={props.interview.student} interviewer={props.interview.interviewer}/>:<Empty/>}
  </article>}