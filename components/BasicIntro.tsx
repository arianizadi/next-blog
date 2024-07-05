"use client"

import Image from "next/image"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export function BasicIntro() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src="/arian_fa22.jpg" alt="Arian Izadi Portrait" width={200} height={200} className="z-10 border-2 border-white rounded-full" />
      <div className="px-8 pt-10 text-center text-white">
        <h1 className="font-bold text-2xl">My name is Arian!</h1>
        <p className="pt-2 max-w-xl">I am a senior studying Computer Science at the University of Nevada, Las Vegas.
          In addition to my academic pursuits, I currently serve as the President of Layer Zero, the cybersecurity club on campus.
          I am always eager to explore and create innovative solutions to problems.</p>
      </div>
    </div>
  )
}