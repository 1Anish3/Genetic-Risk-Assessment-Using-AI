import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#3b82f6,transparent)]" />
      </div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute h-full w-full">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="animate-meteor absolute top-1/2 left-1/2"
            style={{
              width: '2px',
              height: '2px',
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 0 4px rgba(255,255,255,0.1), 0 0 0 8px rgba(255,255,255,0.1)',
              animation: `meteor ${Math.random() * 3 + 2}s linear infinite`,
              transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100}px)`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};