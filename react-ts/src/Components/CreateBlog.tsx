
const CreateBlog = () => {
    return (
        <div>
            <h1 className="text-center text-2xl font-semibold mt-1">Create Blog</h1>
            <div>
                <section className="max-w-4xl p-6 mx-auto bg-slate-300 rounded-md shadow-md dark:bg-gray-800 my-3">
                    <form>
                        <div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Title</label>
                                <input id="username" type="text" className="block w-[50%] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Description</label>
                                <textarea id="emailAddress" className="block w-full h-[200px] p-4  mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                        </div>

                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Post</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default CreateBlog;