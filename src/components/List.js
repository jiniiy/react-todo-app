import React from 'react'
//List컴포넌트를 의미.
export default function List({ todoData, setTodoData }) {
    //const[todoData, setTodoData] = useState([]); 직접 부모state함수를가져오기보단,

    const btnStyle = {
        color: "#fff",
        border: "none",
        padding: "5px 9px",
        borderRadius: "50%",
        cursor:"pointer",
        float:"right"
      }
      
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

    return(
        <div>
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

        </div>
    )
}