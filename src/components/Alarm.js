import React from 'react';

export default function Alarm({ message, style }) {
  // 메시지가 없을 때는 아무것도 렌더링하지 않습니다.
  if (!message) return null;

  return (
    <div className="alarm-container" style={style}>{message}</div> 
  );
}
