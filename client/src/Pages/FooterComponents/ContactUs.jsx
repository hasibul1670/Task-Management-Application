/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import conactUs from "../../assets/animation/85620-contact.json";

const ContactMessageHandler = (ContactData) => {};

const ContactUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [disabled, setDisabled] = useState(true);
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation((userData) => ContactMessageHandler(userData), {
    onSuccess: (data) => {
      reset();

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your FeedBack Send successfully.",
        showConfirmButton: false,
        timer: 2500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2500,
      });
    },
  });

  const onSubmit = (data) => {
    const email = data.email;
    const message = data.message;
    mutation.mutate({ email, message });
  };

  return (
    <div className="main-container p-10 py-20 md:hero min-h-screen   justify-items-center">
      <Helmet>
        <title> Notes | Contact Us</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className=" text-center ">
            <h1 className="text-5xl font-bold">
              Contact <span className="text-blue-500">Us !</span>{" "}
            </h1>

            <div className="w-1/8 mb-10 md:mb-0 mx-auto">
              <Lottie animationData={conactUs} loop={true} />
            </div>
            
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:hero font-bold  "
          >
            <div className="card flex-shrink-0 w-full max-w-screen-sm  shadow-2xl ">
              <div className="card-body">
                {/* Email */}

                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email:</span>
                  </label>

                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        maxLength: (v) =>
                          v.length <= 50 ||
                          "The email should have at most 50 characters",
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            v
                          ) || "Email address must be a valid address",
                      },
                    })}
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />

                  {errors.email?.message && (
                    <small className="text-red-600">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* message */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message : </span>
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    name="message"
                    type="text"
                    placeholder="Type your message..."
                    className="input input-bordered"
                    style={{ height: "200px" }}
                  ></textarea>
                  {errors.message?.type === "required" && (
                    <span className="text-red-600">Message is required!</span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
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
