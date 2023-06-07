import React, { useRef, useEffect } from 'react';

export const Textarea = ({ id, onFocus, onBlur }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textareaElement = textareaRef.current;

    const handleFocus = () => {
      if (onFocus) {
        onFocus(id);
      }
    };

    const handleBlur = () => {
      if (onBlur) {
        onBlur(id);
      }
    };

    if (textareaElement) {
      textareaElement.addEventListener('focus', handleFocus);
      textareaElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener('focus', handleFocus);
        textareaElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [id, onFocus, onBlur]);

  return <textarea ref={textareaRef} />;
}

function MyComponent() {
  const textareaRefs = Array.from({ length: 2 }).map(() => useRef(null));

  const handleTextareaFocus = (id) => {
    console.log(`Textarea ${id} is focused`);
  };

  const handleTextareaBlur = (id) => {
    console.log(`Textarea ${id} lost focus`);
  };

  return (
    <div>
      {textareaRefs.map((ref, index) => (
        <Textarea
          key={index}
          id={index}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          ref={ref}
        />
      ))}
    </div>
  );
}
