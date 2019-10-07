import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"
import Form from "components/Appointment/Form.js"
import useVisualMode from "hooks/useVisualMode"
import Status from "components/Appointment/Status.js"
import Confirmation from "components/Appointment/Confirmation.js"
import Error from "components/Appointment/Error.js"


const CONFIRMATION = "CONFIRMATION"
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE'
const SAVING = "SAVING"
const DELETING = "DELETING"
const EDIT ="EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE= "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = function() {
    transition(CREATE);
  }

  const onCancel = function() {
    back();
  }


  function save(name, interviewer){
    transition(SAVING)
    const interview = {
      student:name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
    .catch(()=> transition(ERROR_SAVE,true))
  }

  const onDelete = function() {
    transition(DELETING)
    const interview = null;
    props.cancelInterview(props.id, interview)
    .then(()=> transition(EMPTY))
    .catch(()=> transition(ERROR_DELETE, true))
  }

  return  <article className="appointment">
  <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=> transition(CONFIRMATION)}
        onEdit={()=> transition(EDIT)}
      />
    )}

      {mode === EDIT && (<Form 
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer= {props.interview.interviewer.id}
        onSave={save}
        onCancel={onCancel}
    />)}

    {mode === ERROR_DELETE && (<Error
    onClose= {onCancel}
    message= "Error 500, Internal server Error"
    />)}

    {mode === ERROR_SAVE && (<Error
    onClose= {onCancel}
    message= "Error 500, Internal server Error"
    />)}


    {mode === SAVING && (<Status
    message= "Saving"/>)}

    {mode === CONFIRMATION && (<Confirmation
    onDelete={onDelete}
    onCancel={onCancel}
    message="You sure you want to delete appointment?"
    />)}

    {mode === DELETING && (<Status
    message={DELETING}
    />)}

    {mode === CREATE && (<Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={onCancel}
    />)}
     
          </article>}
