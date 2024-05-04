import { FaRegFileAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
    return (
        <div>

            <nav className="flex items-center justify-between bg-[#393E46] px-4 py-2 text-white">
                <div className="scale-100 rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
                    <Link to={'/'} className="flex justify-center">
                        <FaRegFileAlt className=" text-blue-500 text-2xl" />
                        <h2>Blog</h2>
                    </Link>
                </div>
                <ul className="flex items-center justify-between gap-6 text-slate-900">
                    <NavLink to={'/'}><li className="cursor-pointer  rounded-full  px-6 py-2 text-white hover:bg-sky-600">Home</li></NavLink>
                    <NavLink to={'/createBlog'}><li className="cursor-pointer  rounded-full  px-6 py-2 text-white hover:bg-sky-600">Create Blog</li></NavLink>
                    <NavLink to={'/myBlog'}><li className="cursor-pointer  rounded-full  px-6 py-2 text-white hover:bg-sky-600">My Blogs</li></NavLink>

                </ul>
                <div>
                    <NavLink to={'/logIn'}>
                        <li className="cursor-pointer flex gap-2 list-none rounded-full px-6 py-2 text-white hover:bg-sky-600">
                            LogIn
                        </li>
                    </NavLink>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;