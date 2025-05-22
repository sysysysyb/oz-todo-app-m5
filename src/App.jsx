import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <div className="todo-container">
      <TodoHeader />
      <div className="todo-list-input">
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  );
}

function TodoHeader() {
  return (
    <header className="todo-header">
      <h2>TODO LIST</h2>
    </header>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="todo-input">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}>
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <li>
      {todo.content}
      <input
        style={{ display: visible ? "block" : "none" }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <div className="buttons">
        <button
          className="edit-btn"
          onClick={() => {
            // 수정 버튼을 클릭하면 visible 상태값 변경
            setVisible((prev) => !prev);

            // input이 보여지는 상태라면
            if (visible) {
              // (input의 값이 빈 문자열일 때는 값을 변경하지 않고 끝냄)
              if (inputValue === "") return;
              // 선택된 투두의 content 값을 input에 입력한 값으로 변경
              setTodoList((prev) =>
                prev.map((el) =>
                  el.id === todo.id ? { ...el, content: inputValue } : el
                )
              );
              setInputValue("");
            }
          }}>
          수정
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id);
            });
          }}>
          삭제
        </button>
      </div>
    </li>
  );
}

export default App;
