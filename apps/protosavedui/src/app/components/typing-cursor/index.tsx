import * as cursor from './index.css';

function TypingCursor() {
  return (
    <span className={cursor.cursorContainer}>
      <span className={cursor.cursorIndicator}></span>
    </span>
  );
}

export { TypingCursor };
