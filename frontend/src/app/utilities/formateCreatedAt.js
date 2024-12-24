// export const formateCreateAt = (createdAt) => {
//     const date = new Date(createdAt);
//     return date.toLocaleDateString();
// }

export const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);

    // Using 'en-GB' locale and options to format as 'DD MMM YYYY'
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // Output: '24 Nov 2024'
}