"use client";

import React, { useEffect, useState } from 'react'

import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Forest', 'Building', 'Tree', 'Color'];



export default function TransitionText() {
  const [index, setIndex] = useState(0);

  
useEffect(() => {
  const intervalId = setInterval(
    () => setIndex((index) => index + 1),
    3000, // every 3 seconds
  );
  return () => clearTimeout(intervalId);
}, []);

return (
  <span>
    <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
  </span>
);
}
