export const getTokenFunction = () => {
    const getCookieValue = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };
    // const getTokenFromCookie = () => {
    const token = getCookieValue('token')
    return token ? `Bearer ${token}` : ''
    // }
}