import React, { useCallback, useEffect, useState } from 'react';

export const CodeArea = ({ text$ }) => {
  const [text, setText] = useState();

  useEffect(() => text$.subscribe(setText).unsubscribe, [text$, setText]);

  const onTextChange = useCallback(
    event => {
      text$.next(event.target.value);
    },
    [text$]
  );

  return (
    <textarea
      value={text}
      onChange={onTextChange}
      className="codearea-textarea"
    />
  );
};
