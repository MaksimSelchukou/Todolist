import App from "./App";
import {ComponentMeta} from "@storybook/react";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";


export default {
    title: 'AppStories',
    component: App,
    decorators: [(Blaa) => (
        <Provider store={store}><Blaa/></Provider>
    ),]
} as ComponentMeta<typeof App>

export const AppBaseExample = () => {
    return <App/>
}