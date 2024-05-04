import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

interface BlogData {
    _id: string;
    title: string;
    description: string;
    date: string;
}

const BlogDetails = () => {
    const blog = useLoaderData() as BlogData;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                // Simulating data fetching delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                setError("Error fetching blog data.");
                setLoading(false);
            }
        };

        fetchBlogData();
    }, []);

    return (
        <div>
            {loading && (
                <div className="flex justify-center p-20">
                    <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-transparent border-l-transparent border-black"></div>
                </div>
            )}
            {!loading && !error && (
                <div>
                    <h1 className="text-3xl font-bold  underline underline-offset-8 m-5 text-black">{blog.title}</h1>
                    <p className="text-sm text-gray-500 m-5">Posted On {blog.date}</p>
                    <p className="text-justify mx-5 text-xl font-medium">{blog.description}</p>
                </div>
            )}
            {error && (
                <div className="flex justify-center items-center p-20">
                    <p className="text-2xl font-bold text-red-600 text-center">Error fetching blogs</p>
                </div>
            )}
        </div>
    );
};

export default BlogDetails;