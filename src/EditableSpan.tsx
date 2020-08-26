import React ,{useState, ChangeEvent} from 'react';
type EditableSpanPropsTypes = {
    title: string;
    onChange: (newValue: string) => void
};
export function EditableSpan(props: EditableSpanPropsTypes) {
const [title, setTitle] = useState("")

    const [editMode , setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    } 
const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
}

const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    return <>
    {editMode ? <input onChange= {onChangeTitleHandler} autoFocus onBlur={activateViewMode} value={title} />:<span onDoubleClick={activateEditMode}>{props.title}</span> } 
    </>
}
