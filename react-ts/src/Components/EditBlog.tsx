import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast';
import moment from "moment";

interface BlogData {
    _id: string;
    title: string;
    description: string;
    date: string;
}
const EditBlog = () => {
    const blog = useLoaderData() as BlogData;
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { data: blogs = [], isError, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            return res.data;
        }
    });
    console.log(blogs);
    const handleUpdateBlog = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const title = (form.elements.namedItem("title") as HTMLInputElement).value;
        const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
        try {
            const updateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
            const UpdateBlog = {
                title,
                description,
                updateTime
            };

            const response = await axiosPublic.put(`/blogs/${blog._id}`, UpdateBlog);
            const data: { modifiedCount: number } = await response.data;

            console.log(data);
            if (data.modifiedCount) {
                toast.success('Blog Successfully');
                setTimeout(() => {
                    navigate('/myBlog');
                }, 1000);
            } else {
                toast.error('Failed to update blog');
            }


        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error('Error updating blog');
        }
    };

    return (
        <div>
            <h1 className="text-center text-2xl font-semibold mt-1">Edit Blog</h1>
            {isLoading && (
                <div className="flex justify-center p-20">
                    <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-transparent border-l-transparent border-black"></div>
                </div>
            )}
            {!isLoading && !isError && (<div>
                <section className="max-w-4xl p-6 mx-auto bg-slate-300 rounded-md shadow-md dark:bg-gray-800 my-3">
                    <form onSubmit={handleUpdateBlog}>
                        <div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Title</label>
                                <input
                                    defaultValue={blog.title}
                                    name="title"
                                    id="username"
                                    type="text"
                                    className="block w-[50%] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Description</label>
                                <textarea
                                    defaultValue={blog.description}
                                    name="description"
                                    id="emailAddress"
                                    className="block w-full h-[200px] p-4  mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                        </div>

                        <div className="flex justify-end mt-6">
                            <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                        </div>
                    </form>
                </section>
            </div>)}
            {isError && (
                <div className="flex justify-center items-center p-20">
                    <p className="text-2xl font-bold text-red-600 text-center">Error fetching blogs</p>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default EditBlog;