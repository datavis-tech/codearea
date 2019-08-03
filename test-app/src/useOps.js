import React, { useRef, useEffect, useState } from 'react';

export const useOps = (text, opSubject) => {
  const previousText = useRef();
  useEffect(() => {
    if(previousText.current !== undefined) {
      console.log('text changed');
    } else {
      console.log('text initialized');
      previousText.current = text;
    }
    //const textarea = textareaRef.current;
    //let previousValue = textarea.value;
    //const onTextChange = () => {
    //  console.log(textarea.value);
    //  console.log()
    //  opSubject.next(op);
    //};
    //textarea.addEventListener('input', onTextChange);
    //return () => {
    //  textarea.removeEventListener('input', onTextChange);
    //};
  }, [text]);
};
