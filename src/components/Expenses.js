import React from 'react'

export default function Expenses({ item, setItem, value, setValue, handleSubmit }) {
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <span className="input-item-title">지출</span> 
      <input 
        className="input-item"
        type="text" 
        name="item"
        placeholder="예) 렌트비"
        value={item}
        onChange={handleItemChange} />
        <div></div>
      <span className="input-item-title">비용</span>
      <input 
        className="input-item"
        type="number" 
        name="value"
        value={value} 
        onChange={handleValueChange} />
        <div></div>
      <input className="input-submit" value="제출" type="submit" />
    </form>
  )
}
