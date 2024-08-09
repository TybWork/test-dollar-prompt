export const getUserLinks = (profileHandle) => {
    let pageArr = {
        users: [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Marketplace",
                link: "/market"
            },
        ],
        seller: [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Marketplace",
                link: "/market"
            },
            {
                title: "Profile",
                link: `/user/${profileHandle}/seller-dashboard`
            },
        ],
        admin: [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Marketplace",
                link: "/market"
            },
            {
                title: "Admin",
                link: "/admin"
            },
        ]
    }
    return pageArr;
}