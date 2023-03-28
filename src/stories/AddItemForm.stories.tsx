import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Example/AddItemForm',
    component: AddItemForm
} as ComponentMeta<typeof AddItemForm>;

const callback = action('clicked button "+" task with title to be added ')

export const AddItemFormExample: ComponentStory<typeof AddItemForm> = (props: any) => {
    return <AddItemForm addItem={callback}/>
}

