import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setError,
} from "../../../redux/reducers/staff/staffRegisterReducer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStaff = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.staffRegister.formData);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5002/api/v1/staff/${id}`).then((res) => {
      dispatch(setFormData(res.data)); // Update form data in the Redux store
      console.log(res.data);
    });
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the name is "role" and parse the value as a number
    const parsedValue = name === "role" ? parseInt(value) : value;

    dispatch(setFormData({ ...formData, [name]: parsedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5002/api/v1/staff/update/${id}`,
        formData
      );
      toast.success("Staff updated successfully!");
      dispatch(setFormData({})); // Clear form data in the Redux store
      navigate("/admin/dashboard/manageaccount");
    } catch (error) {
      dispatch(setError(error.message)); // Dispatch action to update error in Redux store
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col overflow-hidden justify-center items-center w-full min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-100">
        <div className="shadow-xl">
          <h3 className="text-xl font-bold text-blue-400">Register staffs</h3>
        </div>
        <div className="w-[100%] flex flex-col px-2 py-4 mt-5 overflow-hidden bg-gray-50 shadow-md border-t-gray-400 sm:max-w-lg sm:rounded-lg">
          <form
            className="flex justify-start items-start gap-6 flex-col px-3"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center items-center gap-10">
              <div className="mt-4">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  ID Of Staff
                </label>
                <div className="flex flex-col items-start">
                  <input
                    value={formData.id}
                    onChange={handleChange}
                    id="id"
                    type="number"
                    name="id"
                    className="block w-[215px] mt-1 pl-2 outline-none border-gray-400 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  First Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    value={formData.fname}
                    onChange={handleChange}
                    id="fname"
                    type="text"
                    name="fname"
                    className="block w-[215px] mt-1 pl-2 outline-none border-gray-400 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items center gap-10">
              <div className="mt-4">
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Last Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    value={formData.lname}
                    onChange={handleChange}
                    id="lname"
                    type="text"
                    name="lname"
                    className="block w-[215px] mt-1 pl-2 outline-none border-gray-400 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="flex justify-start items-left flex-col gap-[10px]">
                <label htmlFor="role_id">Role</label>
                <select
                  value={formData.role_id}
                  name="role_id"
                  id="role_id"
                  onChange={handleChange}
                  className="w-[215px] h-8 bg-white border-2 pl-[10px] rounded-md border-gray-300 outline-none"
                >
                  <option value="">select role</option>
                  <option value={3}>Dep't Head</option>
                  <option value={4}>HR Officer</option>
                  <option value={5}>Employee</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center items-center gap-10">
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Eamil
                </label>
                <div className="flex flex-col items-start">
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required={true}
                    id="email"
                    name="email"
                    className="block w-[215px] mt-1 pl-2 outline-none border-gray-400 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Phone_number
                </label>
                <div className="flex flex-col items-start">
                  <input
                    value={formData.phone_number}
                    onChange={handleChange}
                    id="phone"
                    type="tel"
                    name="phone_number"
                    className="block w-[215px] mt-1 pl-2 outline-none border-gray-400 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="false"
                  type="password"
                  name="password"
                  className="block w-[215px] mt-1 pl-2 outline-none border-gray-400 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-end justify-end  mt-3 ml-[350px]">
              <button className="w-[100px] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default UpdateStaff;
