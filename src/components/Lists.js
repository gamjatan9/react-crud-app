import React, { useState, useEffect } from 'react';
import Alarm from './Alarm';

export default function Lists({ expsData, setExpsData }) {
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editValue, setEditValue] = useState('');
  const [alarmMessage, setAlarmMessage] = useState('');
  

  // 수정 버튼 클릭 시 호출되는 함수입니다.
  const handleEdit = (id, item, value) => {
    setEditId(id);
    setEditItem(item);
    setEditValue(value);
  };

  // 수정 완료 버튼 클릭 시 호출되는 함수입니다.
  const handleSave = (id) => {
    setExpsData(expsData.map(exps => {
      if (exps.id === id) {
        return { ...exps, item: editItem, value: editValue };
      }
      return exps;
    }));
    setEditId(null);
    setEditItem('');
    setEditValue('');
    setAlarmMessage('수정이 완료되었습니다.');
  };

  // 삭제 버튼 클릭 시 호출되는 함수입니다.
  const handleDelete = (id) => {
    setExpsData(expsData.filter(exps => exps.id !== id));
  };

  // 알람 메시지를 일정 시간 후에 사라지게 하기 위한 useEffect
  useEffect(() => {
    if (alarmMessage) {
      const timer = setTimeout(() => {
        setAlarmMessage(''); // 3초 후 알람 메시지를 초기화합니다.
      }, 3000); // 3초 후 알람 메시지를 사라지게 합니다.

      return () => clearTimeout(timer); 
    }
  }, [alarmMessage]);

  return (
    <div>
      {alarmMessage && <Alarm message={alarmMessage} />}
      {expsData.map((exps) => (
        <div key={exps.id}>
          {editId === exps.id ? (
            <div>
              <input
                type="text"
                value={editItem}
                onChange={(e) => setEditItem(e.target.value)}
              />
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleSave(exps.id)}>수정 완료</button>
            </div>
          ) : (
            <div>
              {`${exps.item}: ${exps.value}`}
              <button onClick={() => handleEdit(exps.id, exps.value)}>수정</button>
              <button onClick={() => handleDelete(exps.id)}>삭제</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
