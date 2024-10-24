import * as React from "react"
const StarIcon = ({ width, fill }) => (
    <svg
        viewBox="0 0 14 14"
        width={width || 14}
        height={width || 14}
        fill="none"
    >
        <path
            fill={fill || "#FFE838"}
            d="M6.024.464a.5.5 0 0 1 .952 0l.983 3.027a.5.5 0 0 0 .476.346h3.184a.5.5 0 0 1 .293.904L9.337 6.613a.5.5 0 0 0-.182.559l.984 3.028a.5.5 0 0 1-.77.559L6.795 8.887a.5.5 0 0 0-.588 0L3.63 10.76a.5.5 0 0 1-.769-.56l.984-3.027a.5.5 0 0 0-.182-.56l-2.575-1.87a.5.5 0 0 1 .293-.905h3.184a.5.5 0 0 0 .476-.346L6.024.464Z"
        />
    </svg>
)
export default StarIcon
