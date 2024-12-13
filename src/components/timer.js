import React from 'react';

export default function Timer(props) {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval = null;

    if (props.start) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          props.setGlobalSeconds(prev+1)
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [props.start]);

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <section className='h-[100px] w-[200px] bg-lightblue rounded-[50px] grid place-content-center text-black text-2xl'>
      {formatTime(seconds)}
    </section>
  );
}
