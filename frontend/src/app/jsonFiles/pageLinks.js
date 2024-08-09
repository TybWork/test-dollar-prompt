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
        {
            title: "Login",
            link: "/login"
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
        {
            title: "Logout",
            link: "/logout"
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
        {
            title: "Logout",
            link: "/"
        },
    ]
}
export default pageArr;