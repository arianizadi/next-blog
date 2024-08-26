'use client';

import React from 'react';

interface Class {
  title: string;
  name: string;
  description: string;
}

export function CourseHistory() {
  const classes: Class[] = [
    {
      title: "CS 715",
      name: "Advanced Analysis of Algorithms",
      description: "Analysis of the complexity and correctness of asymptotically efficient algorithms, including set partitioning, matrix multiplication, integer multiplication and pattern matching algorithms. The theory of NP-completeness; Cooks theorem and polynomial transformations. Basic NP-complete problems, such as the three-satisfactory, three dimensional matching and Hamiltonian circuit problems. PSPACE-completeness results, such as quantified Boolean formulas.",
    },
    {
      title: "CS 789",
      name: "Multiprocessor Programming",
      description: "This course is programming intensive. You will learn how to program multiprocessor systems, clusters, using the state of the art message passing interface MPI. In addition, we will also talk about things of a more theoretical nature like speed-up and efficiency of parallel algorithms, but the main focus will be on, getting your hands dirty, that is, writing a lot of programs using C and MPI. If we have time we might get a chance to look at a process oriented programming language called occam.",
    },
  ];

  const renderClasses = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {classes
        .filter((card) => card)
        .map((card: Class, index: number) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">{card.title}</h2>
              <h3 className="text-xl font-medium text-gray-200 mb-4">{card.name}</h3>
              <p className="text-gray-300">Syllabus - {card.description}</p>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="py-12 bg-gradient-to-b from-[#6525A3] to-black text-white text-center sm:text-left">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Course History</h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-300">University of Nevada, Las Vegas (UNLV)</h2>
        <h3 className="text-3xl font-bold mb-6">Masters Computer Science</h3>
        {renderClasses()}
      </div>
    </div>
  );
}

export default CourseHistory;