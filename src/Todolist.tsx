import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import { AddItemForm } from './AddItemFormTypes';
import { EditableSpan } from './EditableSpan';
import {IconButton, Button} from "@material-ui/core"
import {Delete} from "@material-ui/icons"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
changeTodoListTitle: (id: string, newTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const addTask = (title: string) => {
props.addTask(title, props.id)

    }
    const changeTodoListTitle = (newTitle: string) => {
            props.changeTodoListTitle(props.id, newTitle)
    }
    return <div>
        <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} />
            <button onClick={removeTodolist}>x</button>
        </h3>
       <AddItemForm  addItem={addTask} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue,props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}  />
                        
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <Delete />
                            </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}



