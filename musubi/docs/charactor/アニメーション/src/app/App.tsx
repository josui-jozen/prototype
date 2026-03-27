import React from 'react';
import Stand from '../imports/通常';
import Send from '../imports/送信';
import Reply from '../imports/返信';
import Rest from '../imports/やすみ';
import '../styles/animations.css';

interface CharacterCardProps {
  title: string;
  Component: React.ComponentType;
  animationClass: string;
}

function CharacterCard({ title, Component, animationClass }: CharacterCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 group w-full max-w-[320px]">
      <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100 z-10 transition-transform group-hover:-translate-y-1">
        <h2 className="text-lg font-bold text-gray-700 uppercase tracking-widest">{title}</h2>
      </div>
      
      {/* Container sizing - All 4 components handle their own SVG scaling natively now */}
      <div className="relative w-full aspect-[7/8] bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100/50 overflow-hidden flex items-center justify-center p-4">
        <div className={`w-full h-full relative ${animationClass}`}>
           <Component />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 font-sans selection:bg-rose-100">
      <div className="max-w-7xl w-full flex flex-col items-center gap-12">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Character Animation Gallery
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Reviewing the 4 reused states with continuous CSS keyframe animations. The states are standardized as stand, send, reply, and rest.
          </p>
        </div>

        {/* 4-column responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full place-items-center">
          <CharacterCard title="Stand" Component={Stand} animationClass="anim-stand" />
          <CharacterCard title="Send" Component={Send} animationClass="anim-send" />
          <CharacterCard title="Reply" Component={Reply} animationClass="anim-reply" />
          <CharacterCard title="Rest" Component={Rest} animationClass="anim-rest" />
        </div>
        
      </div>
    </div>
  );
}
