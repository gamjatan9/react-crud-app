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
      지출
      <input 
        type="text" 
        name="item"
        placeholder="지출 항목을 입력"
        value={item}
        onChange={handleItemChange} />
      비용
      <input 
        type="text" 
        name="value"
        value={value} 
        onChange={handleValueChange} />
      <input value="제출" type="submit" />

    </form>
  )
}
