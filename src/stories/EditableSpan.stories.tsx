import {ComponentStory} from "@storybook/react";
import {EditableSpan} from "../components/EditableSpan";
import {AddItemForm} from "../components/AddItemForm";
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


