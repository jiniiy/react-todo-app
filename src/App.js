import React, { useState } from "react";
import "./App.css";

export default function App() {
  const[todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor:"pointer",
    float:"right"
  }

  const getStyle = (completed) =>{
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  }
  //X버튼 누르면 시행
  const clickDeleteButton = (id) => {
    //기존 할일 리스트에 배열 형태로 넣어주기
    let newTodoData = todoData.filter(data => data.id !== id)
    console.log(newTodoData)
    setTodoData(newTodoData)
  };
  //할일 입력
  const inputList = (e) => {
    setValue(e.target.value);
    console.log(e.target.value)
  };

  const handSubmit = (e) => {
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
  //체크박스에 체크넣기
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map(data => {
      console.log("1" + data )
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    //기존 할일 목록 리스트에 새로 넣어준 배열을 갱신해주기
    setTodoData(newTodoData);
    console.log("2" + newTodoData )
  };

 
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

      {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id} >
            <input 
            type="checkbox" 
            defaultChecked={false} 
            onChange={() => handleCompleteChange(data.id)} />
              {data.title}
            <button 
            style={btnStyle}
             onClick={() => clickDeleteButton(data.id)}
            >
              X
            </button>
          </div>
        ))}

            <form style={{display:'flex'}} onSubmit={handSubmit}>
              <input 
                type="text" 
                name="value" 
                style={{ flex: '10', padding: '5px'}}
                placeholder= "해야 할 일을 입력하세요."
                value= {value}     //state관리할 부분
                onChange={inputList}

              />
              <input
                type="submit"
                value="입력"
                className="btn"
                style={{flex:'1'}}
              />
            </form>
        </div>
      </div>
    );
}