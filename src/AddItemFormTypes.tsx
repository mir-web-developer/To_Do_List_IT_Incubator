import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import {Button} from '@material-ui/core'
type AddItemFormTypes = {
    addItem: (title: string) => void;
    
};
export function AddItemForm(props: AddItemFormTypes) {
    let [error, setError] = useState<string | null>(null);
    let [title, setTitle] = useState("");
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);

    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    };
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        }
        else {
            setError("Title is required");
        }
    };
    return <div>
        <input value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""} />
        <Button variant={"contained"} color={"primary"} onClick={addTask}>+</Button>
        {error && <div className="error-message">{error}</div>}
    </div>;
}
