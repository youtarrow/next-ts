import React from 'react';
import Style from 'components/styles/style.module.scss'

// @ts-ignore TS6133: 'props' is declared but its value is never read.
export default function Blog(props) {
    return (
        <h2 className={Style.title}>
            <span>
                { props.title }
            </span>
        </h2>
    )
}