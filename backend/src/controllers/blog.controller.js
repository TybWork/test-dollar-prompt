import { cloudinaryFunc } from '../utils/cloudinary.utils.js'
import fs from 'fs'
import { Blog } from '../models/Blog/blog.model.js';
import slugify from 'slugify'

// create Blog
export const createBlog = async (req, res) => {
    try {
        // cloudinary setup
        const urls = [];

        for (const file of req.files) {
            const url = await cloudinaryFunc(file)
            urls.push(url);

            // Delete the file from the server
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
        }

        // ...............

        // extract title
        const title = req.body.title;
        const slugString = slugify(
            title,
            {
                replacement: '-',
                lower: true,
                trim: true,
                remove: /[^a-zA-Z0-9\s-]/g
            }
        )

        const newBlog = new Blog({
            ...req.body,
            banner: urls,
            slug: slugString,
            //adminId: req.userId
            adminId: "6662ff2b1c4e19a5896f2bfe"
        })

        const savedBlog = await newBlog.save()
        return res.status(200).json(savedBlog);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to create Blog Post ${error}` })
    }
}

//update single blog
export const updateBlog = async (req, res) => {
    const id = req.params.id
    try {
        // cloudinary setup
        const urls = []

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const url = await cloudinaryFunc(file)
                urls.push(url);
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error(`error while deleting file ${err}`)
                    } else {
                        console.log('file deleted successfully')
                    }
                })
            }
        }

        // extract title
        const title = req.body.title;
        const slugString = slugify(
            title,
            {
                replacement: '-',
                lower: true,
                trim: true,
                remove: /[^a-zA-Z0-9\s-]/g
            }
        )

        const updateData = { ...req.body, slug: slugString };

        if (urls.length > 0) {
            updateData.banner = urls
        }

        const updateBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true });
        return res.status(200).json(updateBlog);
    } catch (error) {
        res.status(500).json({ msg: `Failed to update blog:${error}` })
    }
}

//get all blogs
export const getAllBlog = async (req, res) => {
    try {
        const blog = await Blog.find();
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get blogs ${error}` })
    }
}

//get single blog
export const getSingleBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id);
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ msg: `Failed to get single blog` })
    }
}

// get blog on the basis of tags
export const getFilteredBlogs = async (req, res) => {
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/endpoint?userId=234&username='john'
    try {
        const filter = await Blog.find(req.query);
        return res.status(200).json(filter)
    } catch (error) {
        return res.status(400).json({ msg: `Failed to get blog` })
    }
}

//delete single blog
export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        await Blog.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Blog has been deleted successfully" })
    } catch (error) {
        return res.status(400).json({ msg: "Failed to delete blog" })
    }
}