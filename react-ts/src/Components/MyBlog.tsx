import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import Swal from "sweetalert2";

interface Blog {
    _id: string;
    title: string;
    description: string;
    date: string;
    updateTime: string;
}
const MyBlog = () => {
    const axiosPublic = useAxiosPublic();
    const { data: blogs = [], refetch, isError, isLoading } = useQuery<Blog[], AxiosError>({
        queryKey: ['blogs'],
        queryFn: async ({ queryKey }: QueryFunctionContext) => {
            console.log(queryKey);
            try {
                const res = await axiosPublic.get<Blog[]>('/blogs');
                return res.data;
            } catch (error) {
                console.error("Error fetching blogs:", error);
                throw error;
            }
        }
    });

    const handleDelete = (id: string | number): void => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete Blog!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://server-two-kohl.vercel.app/blogs/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
                            refetch();
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting:', error);
                        Swal.fire('Error', 'An error occurred while deleting.', 'error');
                    });
            }
        });
    };

    return (
        <div>
            <h1 className="text-center text-2xl font-semibold mt-1">My Blog</h1>
            <p className="text-center font-semibold text-xl m-2">Blogs : {blogs.length}</p>
            {isLoading && (
                <div className="flex justify-center p-20">
                    <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-transparent border-l-transparent border-black"></div>
                </div>
            )}
            {isError && (
                <div className="flex justify-center items-center p-20">
                    <p className="text-2xl font-bold text-red-600 text-center">Error fetching blogs</p>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 m-3">
                {blogs.map(blog => <div key={blog._id} className="w-full px-8 py-4  bg-slate-300  rounded-lg border-2 border-blue-500">

                    <h2 className="mt-2 text-xl font-semibold text-black dark:text-white md:mt-0">{blog.title}</h2>
                    {blog.date ? (
                        <p className="text-sm text-gray-500">Posted on {blog?.date}</p>
                    ) : (
                        <p className="text-sm text-gray-500">Updated on {blog?.updateTime}</p>
                    )}
                    <p className="line-clamp-3 mt-2 text-sm text-black dark:text-gray-200">{blog.description}</p>

                    <div className="flex justify-between mt-4">
                        <div className="flex justify-center space-x-3 text-2xl">
                            <Link to={`/editBlog/${blog._id}`} className="rounded-lg border-2 border-blue-500 px-3 py-2  text-xl text-blue-500 duration-200 hover:bg-blue-500 hover:text-white"><AiTwotoneEdit /></Link>
                            <button onClick={() => handleDelete(blog._id)} className="rounded-lg border-2 border-red-600 px-3 py-2  text-xl text-red-600 duration-200 hover:bg-red-600 hover:text-white"><AiTwotoneDelete /></button>
                        </div>
                        <div>
                            <Link to={`/myBlogDetails/${blog._id}`} className="text-lg font-medium text-blue-700" role="link">See more</Link>
                        </div>
                    </div>
                </div>)
                }

            </div>
        </div>
    );
};


export default MyBlog;