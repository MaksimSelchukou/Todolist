import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (title: string) => void
    className?:any

}

export const EditableSpan = React.memo(({title, ...props}: EditableSpanType) => {
    console.log('EditableSpan is called')

    const [editTitle, setEditTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    const onBlurHandler = () => {
        // onChangeHandler()
        setEditMode(false)
        props.onChange(editTitle)
        // console.log(editTitle)
    }

    return (
        editMode ?
            <input autoFocus onBlur={onBlurHandler} value={editTitle} type="text" onChange={onChangeHandler}/>
            :
            <span className={props.className} onDoubleClick={onDoubleClickHandler}>{title}</span>
    );
});
