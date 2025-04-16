'use client';
import { useEffect, useRef, useState } from 'react';

function generateCaptcha(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export default function Captcha({ onGenerate }) {
  const canvasRef = useRef(null);

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.font = 'bold 60px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText(text, 20, 95);
    for (let x = 0.5; x < 500; x += 10) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 300);
    }
    for (let y = 0.5; y < 500; y += 10) {
      ctx.moveTo(0, y);
      ctx.lineTo(300, y);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    drawCaptcha(newCaptcha);
    onGenerate?.(newCaptcha);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className='flex flex-row w-max items-center border-solid border-primary border rounded-md bg-gray-100 m-auto'>
      <canvas ref={canvasRef} className='h-[70px]  px-2' />
      <div className='px-3 border-l-2 border-primary text-2xl cursor-pointer' onClick={refreshCaptcha}>&#x21bb;</div>
    </div>
  );
}
