import * as React from "react"
const ArrowIcon = ({ width, fill }) => (
    <svg
        width={width || 20}
        height={width || 20}
        fill="none"
    >
        <path
            fill={fill || "#8FAD92"}
            d="M3.542 14.406a.625.625 0 1 0 1.249-.063l-1.249.063ZM16.25 5.625 9.864 2.262l.28 7.212 6.106-3.849ZM4.79 14.344l-.288-5.739-1.249.063.29 5.739 1.248-.063Zm1.511-7.707 4.352-.169-.048-1.249-4.352.17.048 1.248Zm-1.8 1.968a1.875 1.875 0 0 1 1.8-1.968l-.048-1.249a3.125 3.125 0 0 0-3 3.28l1.249-.063Z"
        />
    </svg>
)
export default ArrowIcon
