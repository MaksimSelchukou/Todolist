import {ComponentStory} from "@storybook/react";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import React from "react";


export default {
    title: 'Example/EditableSpan',
    component: EditableSpan
}

const changeCallback = action('value changed')

export const EditableSpanExample: ComponentStory<typeof AddItemForm> = () => {
    return <EditableSpan title={'default title'} onChange={changeCallback}/>
}


