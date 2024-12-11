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

  function flipCard(index){
    if(isFlipped[index]){
      gsap.to(`.card${index}`, {
        rotateY: "0",
        duration: 0.6
      })
    }
    else {
      gsap.to(`.card${index}`, {
        rotateY: "180deg",
        duration: 0.6
      })
    }

    const newFlipped = isFlipped.map((item,itemIndex) => {
      if(itemIndex === index) return !item;
      return item
    })

    setIsFlipped(newFlipped);
  }

  const [letters, setLetters] = React.useState(
    shuffleArray(['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'])
  );
  const [isFlipped, setIsFlipped] = React.useState(
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
  );

  const cards = letters.map((letter, index) => {
    return <Card key={index} value={letter} className={`card${index}`} onClick={() => flipCard(index)}/>;
  });

  return (
    <section className="flex justify-center items-center h-screen bg-gray-800">
      <section className="grid grid-cols-4 gap-[1em] text-white p-4">
        {cards}
      </section>
    </section>
  );
}
