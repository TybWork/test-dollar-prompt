import * as React from "react"
const CartIcon = ({ width, fillbg, fill }) => (
    <svg
        viewBox="0 0 48 48"
        width={width || 48}
        height={width || 48}
        fill="none"
    >
        <rect width={48} height={48} x={0.5} fill={fillbg || "#F7FFF7"} rx={2} />
        <path
            fill={fill || "#205B26"}
            d="M21.5 42a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM35.5 42a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM26.5 26h4v-5.98h5.98v-4H30.5v-5.96h-4v5.96h-5.98v4h5.98V26Z"
        />
        <path
            fill={fill || "#205B26"}
            d="M20.5 34h16a2 2 0 0 0 1.86-1.28L44.02 18h-4.28l-4.62 12H21.84L12.86 8.46A4 4 0 0 0 9.16 6H4.5v4h4.66l9.5 22.76A2 2 0 0 0 20.5 34Z"
        />
    </svg>
)
export default CartIcon
