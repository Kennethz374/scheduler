export function getAppointmentsForDay (state, day) {
  const filteredDays = state.days.filter(single => single.name === day);
  if (filteredDays.length === 0) {
    return filteredDays;
  }
  let list = filteredDays[0].appointments;
  let ans = [];
  for(let appointmentID of list) {
    if (state.appointments[appointmentID]) {
      ans.push(state.appointments[appointmentID])
    } 
  }
  return ans;
}

export function getInterview(state, interview) {

  let ans = {};
    for(const appointmentsId in state.appointments) {
      if(interview && state.appointments[appointmentsId].interview === interview) {
        let interviewerID = String(state.appointments[appointmentsId].interview.interviewer)
        let interviewer = state.interviewers[interviewerID];
  
        ans["student"] = interview.student
        ans["interviewer"]= interviewer
        return (ans);
      }
    }
    return null;
}

export function getInterviewersForDay (state, day) {
  const filteredDays = state.days.filter(single => single.name === day);
  if (filteredDays.length === 0) {
    return filteredDays;
  }
  let list = filteredDays[0].interviewers;
  let ans = [];
  for(let interviewerID of list) {
    if (state.interviewers[interviewerID]) {
      ans.push(state.interviewers[interviewerID])
    } 
  }
  return ans;
}

// {
//   {"1":
//    {"id":1,
//      "name":"Sylvia Palmer",
// "avatar":"https://i.imgur.com/LpaY82x.png"
// },
// "2":
// {"id":2,
// "name":"Tori Malcolm",
// "avatar":"https://i.imgur.com/Nmx0Qxo.png"
// }
// }
