import React from 'react';
import Card from './components/card';
import gsap from 'gsap';

export default function App() {

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function flipLogic(index){

    if(isAnimating || over.includes(index) || gameOver) return;

    setIsAnimating(true);

    if(active.length === 0){
      flipCard(index);
      setActive(prevActive => [...prevActive, index])
      setIsAnimating(false);
    }

    else if(active[0] === index){
      setIsAnimating(false);
      return;
    } 

    else if(letters[active[0]] === letters[index]){
      setMoves(prevMoves => prevMoves+1);
      flipCard(index);
      setActive([]);
      setIsAnimating(false);
      setOver(prevOver => [...prevOver, index, active[0]]);

      if(over.length >= 12) setGameOver(true);
    }
    
    else{
      setMoves(prevMoves => prevMoves+1);
      flipCard(index, true);
      setTimeout(() => {
        active.forEach(i => flipCard(i));
        setIsAnimating(false);
      }, 1300);
      setActive([]);
    }
  }

  function flipCard(index, reverse=false){
    if(reverse){
      gsap.timeline()
        .to(`.card${index}`,{
          rotateY: "180deg",
          duration: 0.3
        })
        .to(`.card${index}`, {
          rotateY: "0",
          delay: 1,
          duration: 0.3
        });
    }

    else{
      gsap.to(`.card${index}`, {
        rotateY: isFlipped[index]? "0": "180deg",
        duration: 0.3,
      });
  
      setIsFlipped((prevFlipped) => {
        return prevFlipped.map((item, itemIndex) => {
          if(itemIndex === index) return !item;
          return item;
        })
      });
    }
  }

  const [gameOver, setGameOver] = React.useState(false);
  const [over, setOver] = React.useState([]);
  const [letters, setLetters] = React.useState(
    shuffleArray(['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'])
  );
  const [isFlipped, setIsFlipped] = React.useState(
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
  );
  const [active, setActive] = React.useState([]);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const maxActive = 2;

  const cards = letters.map((letter, index) => {
    return <Card key={index} value={letter} className={`card${index}`} onClick={() => flipLogic(index)}/>;
  });

  return (
    <section className="flex justify-center items-center h-screen bg-gray-800">
      <section className="grid grid-cols-4 gap-[10px] text-white p-4">
        {cards}
      </section>
    </section>
  );
}
