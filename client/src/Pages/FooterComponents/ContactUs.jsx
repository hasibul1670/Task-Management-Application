/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

import Lottie from "lottie-react";
import login from "../../assets/animation/85620-contact.json";

const ContactUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.path || "/";

  const { loginUser, setUser, loading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      position: "top-center",
      title: "Sending message...",
      html: '<span class="loading loading-spinner text-primary loading-lg"></span>',
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Message sent successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    }, 2500);
    reset();
  };

  const email = localStorage.getItem("email");

  return (
    <div className="main-container p-4 py-5 md:hero min-h-screen   justify-items-center">
      <Helmet>
        <title> Notes | Contact 😍</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className=" text-center">
            <h1 className="lg:text-5xl text-2xl  font-bold">
              Contact With <span className="text-blue-500">Us !</span>{" "}
            </h1>

            <div className="lg:w-1/8  w-full lg:mb-10 md:mb-0 mx-auto">
              <Lottie animationData={login} loop={true} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:hero font-bold "
          >
            <div className="card flex-shrink-0 w-full max-w-screen-sm  shadow-2xl ">
              <div className="card-body">
                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email:</span>
                  </label>

                  <p className=" h-12 px-4 bg-white text-justify	 border-2  border-blue-200	rounded-lg">
                    {email}
                  </p>
                </div>

                {/* textarea */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Write Your Thought: </span>
                  </label>
                  <textarea
                    {...register("textarea", { required: true })}
                    name="textarea"
                    type="textarea"
                    placeholder="textarea"
                    className="input rounded-lg  border-2 h-48  border-blue-200"
                  />
                  {errors.textarea?.type === "required" && (
                    <span className="text-red-600">textarea is required!</span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn capitalize btn-primary rounded-lg">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
