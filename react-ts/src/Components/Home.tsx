import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";


interface Blog {
    _id: string;
    title: string;
    description: string;
    date: string;
}
const Home = () => {
    const axiosPublic = useAxiosPublic();
    const { data: blogs = [], isError, isLoading } = useQuery<Blog[], AxiosError>({
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

    return (
        <div>
            <h1 className="text-center text-2xl font-semibold mt-1">Home</h1>
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
            <div className="grid grid-cols-3 gap-3 m-3">
                {blogs.map(blog => <div key={blog._id} className="w-full px-8 py-4  bg-slate-300  rounded-lg border-2 border-blue-500">

                    <h2 className="mt-2 text-xl font-semibold text-black dark:text-white md:mt-0">{blog.title}</h2>
                    <p className="text-sm text-gray-500">{blog.date}</p>
                    <p className="line-clamp-3 mt-2 text-sm text-black dark:text-gray-200">{blog.description}</p>

                    <div className="flex justify-end mt-4">
                        <Link to={`/blogDetails/${blog._id}`} className="text-lg font-medium text-blue-700" role="link">See more</Link>
                    </div>
                </div>)
                }

            </div>
        </div>
    );
};

export default Home;