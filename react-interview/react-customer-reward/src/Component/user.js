import React from 'react';
import './user.css';

const User = (props) => {

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.JanPoints}</td>
            <td>{props.FebPoints}</td>
            <td>{props.MarPoints}</td>
            <td>{props.JanPoints + props.FebPoints + props.MarPoints}</td>
            <td>${props.JanTotal + props.FebTotal + props.MarTotal}</td>
        </tr>
    );
}

export default User;
