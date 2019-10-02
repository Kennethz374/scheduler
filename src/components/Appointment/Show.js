import React from "react"


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];
export default function Show (props) {
    return <main className="appointment__card appointment__card--show">
    <section className="appointment__card-left">
      <h2 className="text--regular">{props.student}</h2>
      <section className="interviewer">
        <h4 className="text--light">Interviewer</h4>
        <h3 className="text--regular">{interviewers[0].name}</h3>
      </section>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <img onClick= {props.onEdit}
          className="appointment__actions-button"
          src="images/edit.png"
          alt="Edit"
        />
        <img onClick ={props.onDelete}
          className="appointment__actions-button"
          src="images/trash.png"
          alt="Delete"
        />
      </section>
    </section>
  </main>


}