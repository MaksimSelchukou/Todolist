import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (title: string) => void

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
            <span onDoubleClick={onDoubleClickHandler}>{title}</span>
    );
});
