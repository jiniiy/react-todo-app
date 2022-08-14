import React from "react";

const List = ({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
}) => {
  //체크박스에 체크넣기
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      console.log("1" + data);
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    //기존 할일 목록 리스트에 새로 넣어준 배열을 갱신해주기
    setTodoData(newTodoData);
    console.log("2" + newTodoData);
  };

  //X버튼 누르면 시행
  const clickDeleteButton = (id) => {
    //기존 할일 리스트에 배열 형태로 넣어주기
    let newTodoData = todoData.filter((data) => data.id !== id);
    console.log(newTodoData);
    setTodoData(newTodoData);
  };

  return (
    <div
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
    >
      <div
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100" //drag할 떄 해당 목록 색깔변화
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 rounded`}
      >
        <div className="item-center">
          <input
            type="checkbox"
            onChange={() => handleCompleteChange(id)}
            defaultChecked={completed}
          />{" "}
          <span className={completed ? "line-through" : undefined}>
            {title}
          </span>
        </div>
        <div className="item-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => clickDeleteButton(id)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
