import React from 'react';

const BackgroundSquares = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute bg-[#1A052E]"
        style={{
          width: 'clamp(150px, 30vw, 280px)',
          height: 'clamp(150px, 30vw, 280px)',
          top: '55%',
          borderRadius: '5%',
          left: '-2%',
        }}
      />
      <div
        className="absolute bg-[#1A052E]"
        style={{
          width: 'clamp(120px, 25vw, 200px)',
          height: 'clamp(120px, 25vw, 200px)',
          top: '30%',
          borderRadius: '10%',
          right: 'clamp(10%, 20vw, 30%)',
        }}
      />
      <div
        className="absolute bg-[#1A052E]"
        style={{
          width: 'clamp(60px, 15vw, 100px)',
          height: 'clamp(60px, 15vw, 100px)',
          bottom: '7%',
          borderRadius: '10%',
          right: '5%',
        }}
      />
    </div>
  );
};

export default BackgroundSquares;
