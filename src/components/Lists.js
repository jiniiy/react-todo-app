import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

//List컴포넌트를 의미.
export default function Lists({ todoData, setTodoData }) {
  //const[todoData, setTodoData] = useState([]); 직접 부모state함수를가져오기보단,

  const handleEnd = (result) => {
    console.log("result", result); //result->Dragging한 목록 순서의 위치정보가 들어있다 "index1인애가 index0인곳으로 위치 이동했다"의 정보!(destination, source)
    if (!result.destination) return; //목적지가 있으면 리턴(순서가 바뀌어서 놓이면), 목적지가 없으면 순서가 안바뀌면 그냥 종료
    const newTodoData = todoData; // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성!

    //1.변경시키는 아이템을 배열에서 지워줍니다.
    //2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderItem] = newTodoData.splice(result.source.index, 1); //splice메서드를 이용해 지운다.

    newTodoData.splice(result.destination.index, 0, reorderItem); //splice메서드를 한번 더 이용해서, 지운 위치정보를 const [reorderItem]에 담아가져와서 원하는자리:0에 추가시켜줌.
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        {/* //Dragging한 후(목록 순서위치 바꾼 후) 바꾼 순서를 적용 */}
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
