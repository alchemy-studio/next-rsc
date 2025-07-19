'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => { console.log('Button clicked!'); setCount(count + 1); }}>Count: {count}</button>;
}
