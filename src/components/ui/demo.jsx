import React from 'react';
import { Component } from './ai-loader';

export default function DemoOne() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Component text="Generating" />
    </div>
  );
}
