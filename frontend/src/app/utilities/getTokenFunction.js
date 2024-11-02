export const getTokenFunction = () => {
    const getCookieValue = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };
    const cookie = getCookieValue('token')

    const token = cookie ? `Bearer ${cookie}` : ''
    return {
        cookie,
        token
    }
}