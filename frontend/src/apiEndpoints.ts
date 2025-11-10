const BaseUrl: string = "http://localhost:4000"

const auth = {
    cerateUser: "/api/auth/register",
    loginUser: "/api/auth/login",
    getCurrentUser: "/api/user/current-user",
    logout: "/api/auth/logout",
    updateUserProfile: "/api/user/update-userProfile",
    getAllBlogs: "/api/blog/getAllBlogs",
    latestSixBlogs: "/api/blog/latestSixBlogs",
    search: "/api/blog/search",
    getBlogWithSlug: "/api/blog/getBlog",
    createBlog: "/api/blog/create",
    deleteBlog:"/api/blog/delete"
}

export {
    BaseUrl,
    auth
}