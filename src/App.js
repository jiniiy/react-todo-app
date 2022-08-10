import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {
  const[todoData, setTodoData] = useState([]);  //App 부모컴포넌트에서 todoData와 setTodoData두개의 props을 (List자식컴포넌트)내려준다.
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    //form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌.
    e.preventDefault();

    //새로운 할 일 데이터
    let newTodo = {
      id:Date.now(),
      title:value,
      completed: false,
    };

    //본래 존재하던 할 일에 새로운 할 일 더해주기 업데이트 개념.
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };
 
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          <List todoData={todoData} setTodoData={setTodoData} />   

          <Form handleSubmit={handleSubmit} value={value} setValue={setValue}  />
           
        </div>
      </div>
    );
}