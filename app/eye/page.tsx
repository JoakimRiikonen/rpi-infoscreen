'use client'

import { useEffect, useState } from "react";

export default function Eye()
{
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const delay = Math.floor(Math.random() * 10000);

      setTimeout(() => {
        setBlink(true);
      }, delay);

      setTimeout(() => {
        setBlink(false);
      }, delay + 100);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="eye-page">
      <div>
        <div className={"eye " + (blink ? "blink" : "")}>
        </div>
        <div className="pupil"></div>
      </div>

      <div>
        <div className={"eye " + (blink ? "blink" : "")}>
        </div>
        <div className="pupil"></div>
      </div>
    </div>
  );
}
