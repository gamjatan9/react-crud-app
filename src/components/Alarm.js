import React from 'react';

export default function Alarm({ message }) {
  // 메시지가 없을 때는 아무것도 렌더링하지 않습니다.
  if (!message) return null;

  return (
    <div style={{ padding: '10px', backgroundColor: 'lightgray', marginBottom: '10px', borderRadius: '5px' }}>
      {message}
    </div>
  );
}
