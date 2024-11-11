export const getUserLinks = (profileHandle) => {
    let pageArr = {
        guest: [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Marketplace",
                link: "/market"
            },
        ],
        users: [
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
                link: `user/${profileHandle}/buyer-dashboard/buyer`
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
                link: `user/${profileHandle}/buyer-dashboard/seller`
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