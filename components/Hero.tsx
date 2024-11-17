'use client';

import React, { useEffect, useState } from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-h-full min-w-full object-cover"
      >
        <source src="https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/bosch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative flex h-full items-center justify-center px-5">
        <div className="text-center text-white">
          <div className='flex flex-col md:flex-row justify-center pb-5 md:space-x-5'>
            <DecodeEffect text='Arian' />
            <DecodeEffect text='Izadi' />
          </div>
          <p className="pb-6 text-3xl italic">
            Engineer & Hacker
          </p>
          <div>
            <p className="pb-8 text-xl flex flex-col">
              <span className='font-light'>Masters of Computer Science @ UNLV</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DecodeEffectProps {
  text: string;
}

const DecodeEffect: React.FC<DecodeEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  const characters = 'AAAAABCDEFGHIIIIIIJKLMNOPQRSTUVWXYZaaaaaaabcddddddddefghiiiiiijklmnnnnnnnopqrrrrrrrstuvwxyzzzzz0123456789!@#$%^&*()        ';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (displayText !== text) {
      interval = setInterval(() => {
        setDisplayText(current => {
          const currentArray = current.split('');
          const finalArray = text.split('');
          let newText = '';

          for (let i = 0; i < finalArray.length; i++) {
            if (i < currentArray.length && currentArray[i] === finalArray[i]) {
              newText += currentArray[i];
            } else if (i === currentArray.length) {
              newText += finalArray[i];
            } else {
              newText += characters[Math.floor(Math.random() * characters.length)];
            }
          }

          return newText;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [displayText, text]);

  return (
    <h1
      className="text-6xl font-bold font-mono"

    >
      {displayText}
    </h1>
  );
};

export default Hero;
