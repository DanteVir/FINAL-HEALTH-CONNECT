import React from "react";
import '@testing-library/jest-dom/extend-expect' 
import { render } from "@testing-library/react";
import Cliente from '../pages/Cliente'

test('renders content', () => {
    const citas = { 
        content: "esto es un test",
        impotant: true
    } 
    const component = render(<Cliente cliente={citas}/>)
    console.log(component)
})