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
    console.log(active);

    //if already 2 active and new is flipped
    if(!active.includes(index) && active.length >= maxActive){
      console.log(1);
      for(const i of active) flipCard(i);
      setTimeout(() => {
        flipCard(index);
      }, 200);
      setActive([index]);
    }

    //if already flipped card is flipped
    else if(active.includes(index)){
      console.log(2);
      flipCard(index);
      const newActive = active.filter(i => i !== index);
      setActive(newActive);
    }

    else if(!active.includes(index) && active.length < maxActive){
      console.log(3);
      flipCard(index);
      setActive(prevActive => [...prevActive, index]);
    }
  }

  function flipCard(index){
    gsap.to(`.card${index}`, {
      rotateY: isFlipped[index]? "0": "180deg",
      duration: 0.3,
      overwrite: true
    });

    setIsFlipped((prevFlipped) => {
      return prevFlipped.map((item, itemIndex) => {
        if(itemIndex === index) return !item;
        return item;
      })
    });
  }

  const [letters, setLetters] = React.useState(
    shuffleArray(['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'])
  );
  const [isFlipped, setIsFlipped] = React.useState(
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
  );
  const [active, setActive] = React.useState([]);
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
