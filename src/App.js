import './styles/expenses.css';
import './styles/general.css';
import './styles/lists.css';
import { useState, useEffect } from "react";
import Expenses from "./components/Expenses";
import Lists from "./components/Lists";
import Alarm from './components/Alarm';
import {ReactComponent as Coin } from './assets/coin.svg'
import {ReactComponent as Balloon } from './assets/balloon.svg'

function App() {
  const [expsData, setExpsData] = useState(() => {
    // localStorage에서 데이터를 불러와 초기 상태로 설정
    const savedExpsData = localStorage.getItem("expsData");
    return savedExpsData ? JSON.parse(savedExpsData) : [];
  });
  const [item, setItem] = useState("");
  const [value, setValue] = useState("");
  const [alarmMessage, setAlarmMessage] = useState("예산 계산기");

  useEffect(() => {
    // expsData localStorage 저장
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

    setExpsData((prev) => [...prev, newExps]);
    localStorage.setItem("expsData", JSON.stringify([...expsData, newExps]));

    setItem("");
    setValue("");
    setAlarmMessage("생성 완료");
  };

  const handleRemoveClick = () => {
    setExpsData([]);
    localStorage.setItem("expsData", JSON.stringify([]));
    setAlarmMessage("모두 삭제");
  };

  const handleUpdateAlarmMessage = (message) => {
    setAlarmMessage(message);
  };

  // 3초 동안만 알람 띄워짐
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlarmMessage("예산 계산기");
    }, 2000);

    return () => clearTimeout(timer);
  }, [alarmMessage]);

  const alarmStyle = {
    color: alarmMessage.includes("삭제") ? "#FF0000" : // "삭제"가 포함되면 빨간색
          alarmMessage !== "예산 계산기" ? "#2CDE00" : // 그 외의 메시지면 초록색
          "inherit",
  };
  
  return (
    <div>
      <div className="container">
        <div className="leftSide">
          <Expenses item={item} setItem={setItem} value={value} setValue={setValue} handleSubmit={handleSubmit}/>
          <Coin className="img-coin"/>
          <div className="alarm-position">
            <Balloon className="img-balloon"/>
            <Alarm className="alarm-container" message={alarmMessage} style={alarmStyle} />   
          </div>
        </div>
        <div className="rightSide">
          <Lists expsData={expsData} setExpsData={setExpsData} updateAlarmMessage={handleUpdateAlarmMessage} />
        </div>
      </div>
      <button className="delete-all" onClick={handleRemoveClick}>목록 지우기</button>
    </div>

  );
}

export default App;
