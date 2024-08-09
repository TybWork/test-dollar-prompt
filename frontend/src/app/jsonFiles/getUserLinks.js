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
            {
                title: "Apps",
                link: "/our-apps"
            },
            {
                title: "Create",
                link: "/create"
            },
            {
                title: "Hire",
                link: "/Hire"
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