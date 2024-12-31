'use client'
import styles from '@/app/Components/(Dashbords)/(adminComponents)/ManageBlogComp/ManageBlogComp.module.css'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import FeatureCard from '@/app/Components/FeatureCard/FeatureCard'
import { formatCreatedAt } from '@/app/utilities/formateCreatedAt'
import { useState, useEffect } from 'react'
import BlogPreviewAdminCard from '../../(DashboardsLiteComponent)/BlogPreviewAdminCard/BlogPreviewAdminCard'
import axios from 'axios'
import { getTokenFunction } from '@/app/utilities/getTokenFunction'
import CreateBlogComponent from '../CreateBlogComponent/CreateBlogComponent'
import PrimaryBtn from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn'
const ManageBlogComp = () => {
    const [blogs, setblogs] = useState([])
    const [isEdit, setisEdit] = useState(false)
    const [postId, setpostId] = useState(null)
    const [isActiveNewBlog, setisActiveNewBlog] = useState(false)
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
        setisEdit(true)
        setpostId(id)
    }

    return (
        <div className={styles.parentContainer}>
            {
                isEdit ? (
                    <div style={{
                        overflow: 'auto',
                        height: '650px'
                    }}>
                        <CreateBlogComponent postId={postId} BackBtnFunc={() => setisEdit(false)} />
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => setisActiveNewBlog(true)}
                            className={styles.switchButton}
                            style={{
                                display: isActiveNewBlog ? 'none' : 'flex'
                            }}
                        >
                            Write Blog
                        </button>
                        {
                            (() => {
                                if (isActiveNewBlog) {
                                    return <div
                                        style={{
                                            overflow: 'auto',
                                            height: '650px'
                                        }}
                                    >
                                        <CreateBlogComponent BackBtnFunc={() => setisActiveNewBlog(false)} />
                                    </div>
                                } else {
                                    return <div
                                        className={styles.postsContainer}
                                    >
                                        {blogs && blogs?.map((blog) =>
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
                                }
                            })()
                        }
                    </>
                )
            }

        </div>
    )
}

export default ManageBlogComp