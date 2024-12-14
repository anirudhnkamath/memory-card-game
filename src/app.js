import React from 'react';
import Card from './components/card';
import gsap from 'gsap';
import Scoreboard from './components/scoreboard';
import Timer from './components/timer';

export default function App() {

  const colCount = 6;
  const [letters, setLetters] = React.useState(() => createArray(colCount));
  const [isFlipped, setIsFlipped] = React.useState(Array(colCount * colCount).fill(false));
  const [active, setActive] = React.useState([]);
  const [over, setOver] = React.useState([]);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [isDark, setIsDark] = React.useState(true);

  function flipCard(index, reverse = false) {
    if (reverse) {
      gsap.timeline()
        .to(`.card${index}`, {
          rotateY: "180deg",
          duration: 0.3
        })
        .to(`.card${index}`, {
          rotateY: "0",
          delay: 1,
          duration: 0.3
        });
    }

    else {
      gsap.to(`.card${index}`, {
        rotateY: isFlipped[index] ? "0" : "180deg",
        duration: 0.3,
      });

      setIsFlipped((prevFlipped) => {
        return prevFlipped.map((item, itemIndex) => {
          if (itemIndex === index) return !item;
          return item;
        })
      });
    }
  }

  function flipLogic(index) {

    if (isAnimating || over.includes(index) || gameOver) return;

    setIsAnimating(true);
    setStarted(true);

    if (active.length === 0) {
      flipCard(index);
      setActive(prevActive => [...prevActive, index])
      setIsAnimating(false);
    }

    else if (active[0] === index) {
      setIsAnimating(false);
      return;
    }

    else if (letters[active[0]] === letters[index]) {
      setMoves(prevMoves => prevMoves + 1);
      flipCard(index);
      setActive([]);
      setIsAnimating(false);
      setOver(prevOver => [...prevOver, index, active[0]]);

      if (over.length >= colCount * colCount - 2) {
        setGameOver(true);
        setStarted(false);
      }
    }

    else {
      setMoves(prevMoves => prevMoves + 1);
      flipCard(index, true);
      setTimeout(() => {
        active.forEach(i => flipCard(i));
        setIsAnimating(false);
      }, 1300);
      setActive([]);
    }
  }

  function createArray(cols) {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*()<>:?abcdefghijklmnopqrstuvwxyz";
    let arr = alphabets.slice(0, (cols * cols) / 2).split('');
    return shuffleArray(arr.concat(arr));
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function resetGame() {
    setLetters(createArray(colCount));
    setIsFlipped(Array(colCount * colCount).fill(false));
    setActive([]);
    setOver([]);
    setIsAnimating(false);
    setMoves(0);
    setGameOver(false);
    setStarted(false);
    setSeconds(0);
  }

  const cards = letters.map((letter, index) => (
    <Card
      key={index}
      value={letter}
      className={`card${index}`}
      onClick={() => flipLogic(index)}
    />
  ));

  return (
    <section className={isDark && `dark`}>

      {/* game */}

      {
        !gameOver && (
          <section className="flex justify-center items-center h-screen bg-whitesmoke dark:bg-darkgray flex flex-col gap-[1em]">
            <section className='details w-[min(90vw,500px)] flex justify-center items-center gap-4'>
              <Scoreboard
                total={colCount * colCount}
                over={over.length}
                className={`h-[4em] w-[4em] bg-lightblue rounded-[50%] grid place-content-center text-black text-xl lg:text-2xl dark:bg-white`}
              />
              <Timer start={started} setGlobalSeconds={setSeconds} />
            </section>
            <section
              className={`grid gap-[2%] text-white p-4 w-[min(90vw,500px)] h-[min(90vw,500px)]`}
              style={{ gridTemplateColumns: `repeat(${colCount},1fr)`, fontSize: colCount === 8 ? "1.5rem" : "2rem" }}
            >
              {cards}
            </section>
            <section>
                <button 
                  className='h-[3em] w-[3em] p-[0.5em] grid place-content-center bg-[white] dark:bg-lightblue rounded-[2em] cursor-pointer'
                  onClick={() => setIsDark(!isDark)}
                >
                {
                  isDark
                    ? <img src="/images/sun.svg"/>
                    : <img src="/images/moon.svg"/>
                }
              </button>
            </section>
          </section>
        )
      }


      {/* results */}

      {
        gameOver && 
         (
          <div className='h-screen w-screen grid place-content-center bg-whitesmoke dark:bg-darkgray text-center dark:text-white gap-[1em]'>
            <div className='flex flex-col items-center gap-8'>
              <h1 className='text-4xl font-semibold'>Game Completed</h1>
              <p className='text-2xl'>You made {moves} move{moves === 1 ? '' : "s"} in {seconds} seconds</p>
              <button className='rounded-[50px] bg-lightblue h-[50px] w-[200px] text-xl text-black' onClick={() => resetGame()}>Restart Game</button>
            </div>
            <section className='grid place-content-center'>
                <button 
                  className='h-[3em] w-[3em] p-[0.5em] grid place-content-center bg-[white] dark:bg-lightblue rounded-[2em] cursor-pointer'
                  onClick={() => setIsDark(!isDark)}
                >
                {
                  isDark
                    ? <img src="/images/sun.svg"/>
                    : <img src="/images/moon.svg"/>
                }
              </button>
            </section>
          </div>
        )
      }

    </section>
  );
}
