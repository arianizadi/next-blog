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
        <p className="pt-2 max-w-xl">I have a passion for building and hacking things.
          This website/blog is where I will post most of my current projects and tutorials that I decide to write.
          Currently, I am a robotics software engineering intern, but I enjoy working with embedded systems,
          reverse engineering, application security, networking, and web apps. Hopefully, I'll post something you find interesting!</p>
      </div>
    </div>
  )
}