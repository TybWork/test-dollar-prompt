import React from 'react'

const HeadingCounts = ({ count, heading, textAlign }) => {

    const parentContainer = {
        display: "flex",
        justifyContent: "space-between",
        gap: "2px",
        flexDirection: 'column',
        color: 'var(--homeTertiaryClr)'
    }
    const countStyle = {
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: textAlign
    };

    const headingStyle = {
        fontSize: '14px',
        fontWeight: '500',
        color: 'var(--ratingColor)'
    };

    return (
        <div style={parentContainer}>
            <span style={countStyle}>{count || '50'}</span>
            <span style={headingStyle}>{heading || 'about'}</span>
        </div>
    )
}

export default HeadingCounts