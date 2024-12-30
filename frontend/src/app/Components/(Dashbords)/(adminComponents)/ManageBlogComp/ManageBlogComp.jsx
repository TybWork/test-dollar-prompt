'use client'
import styles from '@/app/Components/(Dashbords)/(adminComponents)/ManageBlogComp/ManageBlogComp.module.css'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import FeatureCard from '@/app/Components/FeatureCard/FeatureCard'
import { formatCreatedAt } from '@/app/utilities/formateCreatedAt'
import { useState, useEffect } from 'react'
import BlogPreviewAdminCard from '../../(DashboardsLiteComponent)/BlogPreviewAdminCard/BlogPreviewAdminCard'
import axios from 'axios'
import { getTokenFunction } from '@/app/utilities/getTokenFunction'
const ManageBlogComp = () => {
    const [blogs, setblogs] = useState([])
    useEffect(() => {

        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/get`)
                setblogs(response.data)
            } catch (error) {
                console.log('error in fetching blogs', error)
            }
        }
        fetchBlog()
    }, [])
    console.log(blogs[0])

    const deleteFunc = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/delete/${id}`,
            {
                headers: {
                    'Authorization': getTokenFunction().token
                }
            }
        )
    }

    const editFunc = (id) => {
        console.log('update blog id', id)
    }

    return (
        <div className={styles.parentContainer}>
            {
                blogs && blogs?.map((blog) =>
                    <BlogPreviewAdminCard
                        title={blog.title}
                        description={blog.description}
                        src={blog?.banner[0]}
                        date={formatCreatedAt(blog.createdAt)}
                        onDelete={() => deleteFunc(blog._id)}
                        onEdit={() => editFunc(blog._id)}
                    />
                )
            }

        </div>
    )
}

export default ManageBlogComp