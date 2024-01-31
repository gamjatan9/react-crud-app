import './styles/App.css';
import { useState, useEffect } from "react";
import Expenses from "./components/Expenses";
import Lists from "./components/Lists";

function App() {
  const [expsData, setExpsData] = useState(() => {
    // localStorage에서 데이터를 불러와 초기 상태로 설정
    const savedExpsData = localStorage.getItem("expsData");
    return savedExpsData ? JSON.parse(savedExpsData) : [];
  });
  const [item, setItem] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    // expsData가 변경될 때마다 localStorage에 저장
    localStorage.setItem("expsData", JSON.stringify(expsData));
  }, [expsData]);

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 데이터
    let newExps = {
      id: Date.now(),
      item: item,
      value: value,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    setExpsData((prev) => [...prev, newExps]);
    localStorage.setItem("expsData", JSON.stringify([...expsData, newExps]));

    // 입력란에 있던 글씨 지워주기
    setItem("");
    setValue("");
  };

  const handleRemoveClick = () => {
    setExpsData([]);
    localStorage.setItem("expsData", JSON.stringify([]));
  };

  return (
    <div>
      <h1>예산 계산기</h1>
      <div>
        <Expenses item={item} setItem={setItem} value={value} setValue={setValue} handleSubmit={handleSubmit}/>
      </div>
      <button onClick={handleRemoveClick}>Delete All</button>
      <div>
        <Lists expsData={expsData} setExpsData={setExpsData} />
      </div>
        
    </div>
  );
}

export default App;
