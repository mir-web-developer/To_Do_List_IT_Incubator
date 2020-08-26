import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemFormTypes";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true }
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true }
    ]
  });

  function removeTask(id: string, todolistId: string) {
    //Ð´Ð¾ÑÑÐ°Ð½ÐµÐ¼ Ð½ÑÐ¶Ð½ÑÐ¹ Ð¼Ð°ÑÑÐ¸Ð² Ð¿Ð¾ todolistId:
    let todolistTasks = tasks[todolistId];
    // Ð¿ÐµÑÐµÐ·Ð°Ð¿Ð¸ÑÐµÐ¼ Ð² ÑÑÐ¾Ð¼ Ð¾Ð±ÑÐµÐºÑÐµ Ð¼Ð°ÑÑÐ¸Ð² Ð´Ð»Ñ Ð½ÑÐ¶Ð½Ð¾Ð³Ð¾ ÑÑÐ´ÑÐ»Ð¸ÑÑÐ° Ð¾ÑÑÐ¸Ð»ÑÑÐ¾Ð²Ð°Ð½Ð½ÑÐ¼ Ð¼Ð°ÑÑÐ¸Ð²Ð¾Ð¼:
    tasks[todolistId] = todolistTasks.filter((t) => t.id !== id);
    // Ð·Ð°ÑÐµÑÐ°ÐµÐ¼ Ð² ÑÑÐµÐ¹Ñ ÐºÐ¾Ð¿Ð¸Ñ Ð¾Ð±ÑÐµÐºÑÐ°, ÑÑÐ¾Ð±Ñ React Ð¾ÑÑÐµÐ°Ð³Ð¸ÑÐ¾Ð²Ð°Ð» Ð¿ÐµÑÐµÑÐ¸ÑÐ¾Ð²ÐºÐ¾Ð¹
    setTasks({ ...tasks });
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    //Ð´Ð¾ÑÑÐ°Ð½ÐµÐ¼ Ð½ÑÐ¶Ð½ÑÐ¹ Ð¼Ð°ÑÑÐ¸Ð² Ð¿Ð¾ todolistId:
    let todolistTasks = tasks[todolistId];
    // Ð¿ÐµÑÐµÐ·Ð°Ð¿Ð¸ÑÐµÐ¼ Ð² ÑÑÐ¾Ð¼ Ð¾Ð±ÑÐµÐºÑÐµ Ð¼Ð°ÑÑÐ¸Ð² Ð´Ð»Ñ Ð½ÑÐ¶Ð½Ð¾Ð³Ð¾ ÑÑÐ´ÑÐ»Ð¸ÑÑÐ° ÐºÐ¾Ð¿Ð¸ÐµÐ¹, Ð´Ð¾Ð±Ð°Ð²Ð¸Ð² Ð² Ð½Ð°ÑÐ°Ð»Ð¾ Ð½Ð¾Ð²ÑÑ ÑÐ°ÑÐºÑ:
    tasks[todolistId] = [task, ...todolistTasks];
    // Ð·Ð°ÑÐµÑÐ°ÐµÐ¼ Ð² ÑÑÐµÐ¹Ñ ÐºÐ¾Ð¿Ð¸Ñ Ð¾Ð±ÑÐµÐºÑÐ°, ÑÑÐ¾Ð±Ñ React Ð¾ÑÑÐµÐ°Ð³Ð¸ÑÐ¾Ð²Ð°Ð» Ð¿ÐµÑÐµÑÐ¸ÑÐ¾Ð²ÐºÐ¾Ð¹
    setTasks({ ...tasks });
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //Ð´Ð¾ÑÑÐ°Ð½ÐµÐ¼ Ð½ÑÐ¶Ð½ÑÐ¹ Ð¼Ð°ÑÑÐ¸Ð² Ð¿Ð¾ todolistId:
    let todolistTasks = tasks[todolistId];
    // Ð½Ð°Ð¹Ð´ÑÐ¼ Ð½ÑÐ¶Ð½ÑÑ ÑÐ°ÑÐºÑ:
    let task = todolistTasks.find((t) => t.id === id);
    //Ð¸Ð·Ð¼ÐµÐ½Ð¸Ð¼ ÑÐ°ÑÐºÑ, ÐµÑÐ»Ð¸ Ð¾Ð½Ð° Ð½Ð°ÑÐ»Ð°ÑÑ
    if (task) {
      task.isDone = isDone;
      // Ð·Ð°ÑÐµÑÐ°ÐµÐ¼ Ð² ÑÑÐµÐ¹Ñ ÐºÐ¾Ð¿Ð¸Ñ Ð¾Ð±ÑÐµÐºÑÐ°, ÑÑÐ¾Ð±Ñ React Ð¾ÑÑÐµÐ°Ð³Ð¸ÑÐ¾Ð²Ð°Ð» Ð¿ÐµÑÐµÑÐ¸ÑÐ¾Ð²ÐºÐ¾Ð¹
      setTasks({ ...tasks });
    }
  }
  function changeTaskTite(id: string, newTitle: string, todolistId: string) {
    //Ð´Ð¾ÑÑÐ°Ð½ÐµÐ¼ Ð½ÑÐ¶Ð½ÑÐ¹ Ð¼Ð°ÑÑÐ¸Ð² Ð¿Ð¾ todolistId:
    let todolistTasks = tasks[todolistId];
    // Ð½Ð°Ð¹Ð´ÑÐ¼ Ð½ÑÐ¶Ð½ÑÑ ÑÐ°ÑÐºÑ:
    let task = todolistTasks.find((t) => t.id === id);
    //Ð¸Ð·Ð¼ÐµÐ½Ð¸Ð¼ ÑÐ°ÑÐºÑ, ÐµÑÐ»Ð¸ Ð¾Ð½Ð° Ð½Ð°ÑÐ»Ð°ÑÑ
    if (task) {
      task.title = newTitle;
      // Ð·Ð°ÑÐµÑÐ°ÐµÐ¼ Ð² ÑÑÐµÐ¹Ñ ÐºÐ¾Ð¿Ð¸Ñ Ð¾Ð±ÑÐµÐºÑÐ°, ÑÑÐ¾Ð±Ñ React Ð¾ÑÑÐµÐ°Ð³Ð¸ÑÐ¾Ð²Ð°Ð» Ð¿ÐµÑÐµÑÐ¸ÑÐ¾Ð²ÐºÐ¾Ð¹
      setTasks({ ...tasks });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(id: string) {
    // Ð·Ð°ÑÑÐ½ÐµÐ¼ Ð² ÑÑÐµÐ¹Ñ ÑÐ¿Ð¸ÑÐ¾Ðº ÑÑÐ´ÑÐ»Ð¸ÑÑÐ¾Ð², id ÐºÐ¾ÑÐ¾ÑÑÑ Ð½Ðµ ÑÐ°Ð²Ð½Ñ ÑÐ¾Ð¼Ñ, ÐºÐ¾ÑÐ¾ÑÑÐ¹ Ð½ÑÐ¶Ð½Ð¾ Ð²ÑÐºÐ¸Ð½ÑÑÑ
    setTodolists(todolists.filter((tl) => tl.id !== id));
    // ÑÐ´Ð°Ð»Ð¸Ð¼ ÑÐ°ÑÐºÐ¸ Ð´Ð»Ñ ÑÑÐ¾Ð³Ð¾ ÑÑÐ´ÑÐ»Ð¸ÑÑÐ° Ð¸Ð· Ð²ÑÐ¾ÑÐ¾Ð³Ð¾ ÑÑÐµÐ¹ÑÐ°, Ð³Ð´Ðµ Ð¼Ñ ÑÑÐ°Ð½Ð¸Ð¼ Ð¾ÑÐ´ÐµÐ»ÑÐ½Ð¾ ÑÐ°ÑÐºÐ¸
    delete tasks[id]; // ÑÐ´Ð°Ð»ÑÐµÐ¼ ÑÐ²-Ð²Ð¾ Ð¸Ð· Ð¾Ð±ÑÐµÐºÑÐ°... Ð·Ð½Ð°ÑÐµÐ½Ð¸ÐµÐ¼ ÐºÐ¾ÑÐ¾ÑÐ¾Ð³Ð¾ ÑÐ²Ð»ÑÐ»ÑÑ Ð¼Ð°ÑÑÐ¸Ð² ÑÐ°ÑÐ¾Ðº
    // Ð·Ð°ÑÐµÑÐ°ÐµÐ¼ Ð² ÑÑÐµÐ¹Ñ ÐºÐ¾Ð¿Ð¸Ñ Ð¾Ð±ÑÐµÐºÑÐ°, ÑÑÐ¾Ð±Ñ React Ð¾ÑÑÐµÐ°Ð³Ð¸ÑÐ¾Ð²Ð°Ð» Ð¿ÐµÑÐµÑÐ¸ÑÐ¾Ð²ÐºÐ¾Ð¹
    setTasks({ ...tasks });
  }
  function addTodoList(title: string) {
    let todoList: TodolistType = {
      id: v1(),
      filter: "all",
      title: title
    };
    setTodolists([todoList, ...todolists]);
setTasks ( {...tasks , [todoList.id]: []})
  }

  const changeTodoListTitle = (id: string , newTitle: string) => {
const todolist = todolists.find(tl => tl.id === id)
if(todolist){
todolist.title = newTitle
setTodolists([...todolists])
}
  }
  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todolists.map((tl) => {
        let allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTite}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
