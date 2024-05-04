

const Blog = () => {
    return (
        <div>
            <div className="w-full max-w-md px-8 py-4 mt-16 bg-slate-300  rounded-lg border-2 border-blue-500 m-2">

                <h2 className="mt-2 text-xl font-semibold text-black dark:text-white md:mt-0">Design Tools</h2>
                <p className="mt-2 text-sm text-black dark:text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!</p>

                <div className="flex justify-end mt-4">
                    <a href="#" className="text-lg font-medium text-blue-700" role="link">userName</a>
                </div>
            </div>
        </div>
    );
};

export default Blog;