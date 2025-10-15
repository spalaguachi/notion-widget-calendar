import React from "react";
import { useParams } from "react-router";
const Calendar = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div>Calendar</div>
      <p>this is {id}</p>
    </>
  );
};

export default Calendar;
