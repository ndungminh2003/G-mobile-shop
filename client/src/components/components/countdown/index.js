import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { calculateDiff } from "./utils";
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export default function Countdown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState();
  console.log("remaining", remainingTime);
  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval();
  }, [timeInMs]);
  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calculateDiff(timeInMs));
  };

  return (
    <div className={styles.countdown}>
      {[...Array(remainingTime?.days.length).keys()].map((d, i) => (
        <span>{remainingTime?.days.slice(i, i + 1)}</span>
      ))}
      <b>:</b>
      <span>{remainingTime?.hours.slice(0, 1)}</span>
      <span>{remainingTime?.hours.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.minutes.slice(0, 1)}</span>
      <span>{remainingTime?.minutes.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.seconds.slice(0, 1)}</span>
      <span>{remainingTime?.seconds.slice(1, 2)}</span>
    </div>
  );
}

// export default function Countdown({ date }) {
//   const [timeInMs, setTimeInMs] = useState(date ? date.getTime() : 0);
//   const [remainingTime, setRemainingTime] = useState();
//   console.log("remaining", remainingTime);

//   useEffect(() => {
//     if (date) {
//       setTimeInMs(date.getTime());
//     }
//   }, [date]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       updateRemainingTime(timeInMs);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timeInMs]);

//   const updateRemainingTime = (timeInMs) => {
//     setRemainingTime(calculateDiff(timeInMs));
//   };

//   const calculateDiff = (timeInMs) => {
//     // Perform your calculation to determine remaining time
//     // and return an object with the days, hours, minutes, and seconds.
//     // This is just a placeholder implementation; you'll need to replace it.
//     const days = Math.floor(timeInMs / (24 * 60 * 60 * 1000));
//     const hours = Math.floor(
//       (timeInMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
//     );
//     const minutes = Math.floor((timeInMs % (60 * 60 * 1000)) / (60 * 1000));
//     const seconds = Math.floor((timeInMs % (60 * 1000)) / 1000);

//     return { days, hours, minutes, seconds };
//   };

//   return (
//     <div className={styles.countdown}>
//       {[...Array(remainingTime?.days?.toString().length).keys()].map((d, i) => (
//         <span key={i}>{remainingTime?.days?.toString().slice(i, i + 1)}</span>
//       ))}
//       <b>:</b>
//       <span>{remainingTime?.hours?.toString().slice(0, 1)}</span>
//       <span>{remainingTime?.hours?.toString().slice(1, 2)}</span>
//       <b>:</b>
//       <span>{remainingTime?.minutes?.toString().slice(0, 1)}</span>
//       <span>{remainingTime?.minutes?.toString().slice(1, 2)}</span>
//       <b>:</b>
//       <span>{remainingTime?.seconds?.toString().slice(0, 1)}</span>
//       <span>{remainingTime?.seconds?.toString().slice(1, 2)}</span>
//     </div>
//   );
// }
