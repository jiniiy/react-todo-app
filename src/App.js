import React, { useState, useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

export default function App() {
  console.log("App Component");
  const [todoData, setTodoData] = useState([]); //App 부모컴포넌트에서 todoData와 setTodoData두개의 props을 (List자식컴포넌트)내려준다.

  const [value, setValue] = useState("");

  //X버튼 누르면 시행
  const clickDeleteButton = useCallback(
    //콜백함수 적용
    (id) => {
      //기존 할일 리스트에 배열 형태로 넣어주기
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log(newTodoData);
      setTodoData(newTodoData);
    },
    [todoData] //콜백함수의 의존성배열 추가(참조하는 props가 있으므로!)
  );

  const handleSubmit = (e) => {
    //form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌.
    e.preventDefault();

    //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    //본래 존재하던 할 일에 새로운 할 일 더해주기 업데이트 개념.
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  const clickDeleteAll = () => {
    setTodoData([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-red-300">
      <div className="bg-white selection:w-full p-6 m-4 rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="bg-blue-200 flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={clickDeleteAll}>Delete All</button>
        </div>
        <Lists
          clickDeleteButton={clickDeleteButton}
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
