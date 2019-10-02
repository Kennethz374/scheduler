
import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  //  let dayClass = "day-list__item";
  //  if(props.selected) {
  //    dayClass += "--selected"
  //  }
  //  if(props.spots === 0) {
  //    dayClass += "--full";
  //  }
   
  let dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (!props.spots)
  }) 
  
  const formatSpots = function() {
    let spots = props.spots;
    if (spots === 0) {
      return `no spots remaining`;
    } else if (spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
    
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} </h3>
    </li>
  );
}
