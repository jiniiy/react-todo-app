import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    clickDeleteButton,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitel] = useState(title);

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
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const EditChangeText = (event) => {
      setEditedTitel(event.target.value);
    };

    //edit 입력한후 save하는 함수!
    const handleSubmitSave = (event) => {
      event.preventDefault();

      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div
          className={`flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 rounded`}
        >
          <div className="item-center">
            {/* //edit한후에 Save하기 */}
            <form onSubmit={handleSubmitSave}>
              <input
                value={editedTitle}
                onChange={EditChangeText}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
              />
            </form>
          </div>
          <div className="item-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(false)}
              type="button"
            >
              X
            </button>
            {/* //edit버튼 만들기 */}
            <button
              onClick={handleSubmitSave}
              className="px-4 py-2 float-right"
              type="submit"
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
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
              {/* //edit버튼 만들기 */}
              <button
                className="px-4 py-2 float-right"
                onClick={() => setIsEditing(true)}
              >
                edit
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default List;
