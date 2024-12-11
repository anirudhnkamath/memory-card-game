// import React from 'react';
// import Card from './components/card';
// import gsap from 'gsap';

// export default function App() {

//   const COLUMNS = 2;

//   const [gameOver, setGameOver] = React.useState(false);
//   const [over, setOver] = React.useState([]);
//   const [letters, setLetters] = React.useState(createArray(COLUMNS));
//   const [isFlipped, setIsFlipped] = React.useState(Array(COLUMNS*COLUMNS).fill(false));
//   const [active, setActive] = React.useState([]);
//   const [isAnimating, setIsAnimating] = React.useState(false);
//   const [moves, setMoves] = React.useState(0);

//   function shuffleArray(arr) {
//     for (let i = arr.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
//   }

//   function flipLogic(index){

//     if(isAnimating || over.includes(index) || gameOver) return;

//     setIsAnimating(true);

//     if(active.length === 0){
//       flipCard(index);
//       setActive(prevActive => [...prevActive, index])
//       setIsAnimating(false);
//     }

//     else if(active[0] === index){
//       setIsAnimating(false);
//       return;
//     } 

//     else if(letters[active[0]] === letters[index]){
//       setMoves(prevMoves => prevMoves+1);
//       flipCard(index);
//       setActive([]);
//       setIsAnimating(false);
//       setOver(prevOver => [...prevOver, index, active[0]]);

//       if(over.length >= 12) setGameOver(true);
//     }

//     else{
//       setMoves(prevMoves => prevMoves+1);
//       flipCard(index, true);
//       setTimeout(() => {
//         active.forEach(i => flipCard(i));
//         setIsAnimating(false);
//       }, 1300);
//       setActive([]);
//     }
//   }

//   function flipCard(index, reverse=false){
//     if(reverse){
//       gsap.timeline()
//         .to(`.card${index}`,{
//           rotateY: "180deg",
//           duration: 0.3
//         })
//         .to(`.card${index}`, {
//           rotateY: "0",
//           delay: 1,
//           duration: 0.3
//         });
//     }

//     else{
//       gsap.to(`.card${index}`, {
//         rotateY: isFlipped[index]? "0": "180deg",
//         duration: 0.3,
//       });

//       setIsFlipped((prevFlipped) => {
//         return prevFlipped.map((item, itemIndex) => {
//           if(itemIndex === index) return !item;
//           return item;
//         })
//       });
//     }
//   }

//   function createArray(cols){
//     const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*+=><?abcdefghijklmnopqrstuvwxyz';
//     const arr = s.slice(0,(cols*cols)/2).split('');
//     const retarr = shuffleArray(arr.concat(arr));
//     console.log(retarr);
//     return retarr;
//   }

//   const cards = letters.map((letter, index) => {
//     return <Card key={index} value={letter} className={`card${index}`} onClick={() => flipLogic(index)}/>;
//   });

//   return (
//     <section className="flex justify-center items-center h-screen bg-gray-800">
//       <section className="grid gap-[10px] text-white p-4" style={{gridTemplateColumns: `repeat(${COLUMNS},1fr)`}}>
//         {cards}
//       </section>
//     </section>
//   );
// }


import React from 'react';
import Card from './components/card';
import gsap from 'gsap';

export default function App() {
  
  const colCount = 2;
  const [letters, setLetters] = React.useState(() => createArray(colCount));
  const [isFlipped, setIsFlipped] = React.useState(Array(colCount * colCount).fill(false));
  const [active, setActive] = React.useState([]);
  const [over, setOver] = React.useState([]);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

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

      if (over.length >= colCount*colCount - 2) {
        setGameOver(true);
        console.log(moves+1);
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
    arr = shuffleArray(arr.concat(arr));
    console.log(arr);
    return arr;
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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
    <section className="flex justify-center items-center h-screen bg-gray-800">
      <section
        className={`grid gap-[2%] text-white p-4 w-[min(90vw,500px)] h-[min(90vw,500px)]`}
        style={{gridTemplateColumns: `repeat(${colCount},1fr)`, fontSize: colCount === 8? "1.5rem" : "2rem"}}
      >
        {cards}
      </section>
    </section>
  );
}
