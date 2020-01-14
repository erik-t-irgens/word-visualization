import React from 'react';
import { Icon } from 'semantic-ui-react';

// Converted to a functional component without state.

const AddNode = (props) => {

    return (

        <Icon
            inverted
            color="green"
            link
            style={{
                position: 'absolute',
                left: props.clientX,
                top: props.clientY,
                transform: "translate(-50%, -50%)",
                height: '10px',
                width: '10px',
                textShadow: "3px 3px 2px black",
                opacity: 1
            }}
            name='plus circle'>
        </Icon>
    )
}
export default AddNode;