import { useEffect, useState, useMemo } from 'react';
import Countdown from 'react-countdown';
import './App.css';

function App() {
  const [session, setSession] = useState("");
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());
  const [targetTimeCountdown, setTargetTimeCountdown] = useState();

  useEffect(() => {
    const interval = setInterval(() => setCurrentMinute(new window.Date().getMinutes()), 1000);
    
    let targetTime = new Date();

    if (currentMinute < 25) {
      targetTime.setMinutes(25);
      targetTime.setSeconds(0);
      setSession("work");
    } else if (currentMinute >= 25 && currentMinute < 30) {
      targetTime.setMinutes(30);
      targetTime.setSeconds(0);
      setSession("break");
    } else if (currentMinute >= 30 && currentMinute < 55) {
      targetTime.setMinutes(55);
      targetTime.setSeconds(0);
      setSession("work");
    } else if(currentMinute >= 55){
      targetTime.setHours(targetTime.getHours() + 1);
      targetTime.setMinutes(0);
      targetTime.setSeconds(0);
      setSession("break");
    }

    setTargetTimeCountdown(targetTime);
    
    return () => {
      clearInterval(interval);
    };
  }, [currentMinute])

  return (
    <div>
      <Countdown date={targetTimeCountdown} key={targetTimeCountdown} />
      <div>{session}</div>
    </div>
  );
}

export default App;
