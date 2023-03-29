import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {action, actions} from "@storybook/addon-actions";

type AddItemFormPropsType = {
    // title: string
    // onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    // onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
    addItem: (title: string) => void
    // error: string | null

}



export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm')
    const {addItem} = props

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});
