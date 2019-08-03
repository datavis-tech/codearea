import React, { useRef, useEffect, useState } from 'react';
import { generateOp } from './generateOp';

export const useOps = (text, op$) => {
  const previousText = useRef();
  useEffect(() => {
    if (previousText.current !== undefined) {
      op$.next(generateOp(previousText.current, text));
    } else {
      console.log('text initialized');
    }
    previousText.current = text;
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
