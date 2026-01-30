import React, { useEffect, useState } from 'react';

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

const TextReveal = ({ children, className = "" }) => {
  const [text, setText] = useState(children);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        children
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return children[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [children]);

  return <span className={className}>{text}</span>;
};

export default TextReveal;
