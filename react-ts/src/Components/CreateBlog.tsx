import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import axiosPublic from '../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

interface BlogFormData {
    title: string;
    description: string;
    date: string; // Add date field to your form data
}

const CreateBlog = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values: BlogFormData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            // Add current date to the form data
            const formDataWithDate = { ...values, date: moment().format('MMMM Do YYYY, h:mm:ss a') };

            const response = await axiosPublic().post('/blogs', formDataWithDate);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error)
        }
        setSubmitting(false);
    };

    return (
        <div>
            <h1 className="text-center text-2xl font-semibold mt-1">Create Blog</h1>
            <div>
                <section className="max-w-4xl p-6 mx-auto bg-slate-300 rounded-md shadow-md dark:bg-gray-800 my-3">
                    <Formik
                        initialValues={{ title: '', description: '', date: '' }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <div>
                                        <label className="text-gray-700 dark:text-gray-200">Title</label>
                                        <Field type="text" required placeholder='Title' name="title" className="block w-[50%] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                        <ErrorMessage name="title" component="div" className="text-red-500" />
                                    </div>

                                    <div>
                                        <label className="text-gray-700 dark:text-gray-200">Description</label>
                                        <Field as="textarea" required placeholder='Description...' name="description" className="block w-full h-[200px] p-4  mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                        <ErrorMessage name="description" component="div" className="text-red-500" />
                                    </div>

                                </div>

                                <div className="flex justify-end mt-6">
                                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" disabled={isSubmitting}>Post</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </section>
            </div>
        </div>
    );
};

export default CreateBlog;
