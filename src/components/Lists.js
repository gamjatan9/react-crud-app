import React, { useState } from 'react';
import { ReactComponent as Edit } from '../assets/edit.svg'

export default function Lists({ expsData, setExpsData, updateAlarmMessage }) {
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editValue, setEditValue] = useState('');
  
  // 수정 
  const handleEdit = (id, item, value) => {
    setEditId(id);
    setEditItem(item);
    setEditValue(value);
  };

  // 수정 완료 버튼 클릭 시 
  const handleSave = (id) => {
    setExpsData(expsData.map(data => {
      if (data.id === id) {
        return { ...data, item: editItem, value: editValue };
      }
      return data;
    }));
    setEditId(null);
    setEditItem('');
    setEditValue('');
    updateAlarmMessage('수정 완료');
  };

  // 삭제 버튼
  const handleDelete = (id) => {
    setExpsData(expsData.filter(data => data.id !== id));
    updateAlarmMessage('아이템 삭제');
  };

  // 총 지출을 계산하는 함수
  const calculateTotalExps = () => {
    return expsData.reduce((total, current) => {
      // value를 숫자로 변환하고 더합니다.
      return total + parseFloat(current.value || 0);
    }, 0);
  };

  const totalExps = calculateTotalExps();

  return (
    <div className="container-lists">
      <div className="total-container">
        <span className="total">총 지출</span>
        <span className="total-exps">{totalExps}</span>
      </div>
      <div className="border"></div>
      {expsData.map((data) => (
        <div key={data.id}>
          {editId === data.id ? (
            <div className='list-container'>
              <input
                className="input-list-item"
                type="text"
                value={editItem}
                onChange={(e) => setEditItem(e.target.value)}
              />
              <input
                className="input-list-value"
                type="number" 
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleSave(data.id)}>수정 완료</button>
            </div>
          ) : (
            <div className="list-container">
              <span className="list-item">{data.item}</span>
              <span className="list-value">{data.value}</span>
              <button className="list-edit" onClick={() => handleEdit(data.id, data.item, data.value)}><Edit /></button>
              <button className="list-delete" onClick={() => handleDelete(data.id)}>X</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
