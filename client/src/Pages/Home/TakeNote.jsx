/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { usePostNoteMutation } from "../../redux/features/note/noteApi";

const TakeNote = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(true);

  const handleCardClick = () => {
    window.my_modal_2.showModal();
    setPopupVisible(true);
  };
  const handleCloseModal = () => {
    setPopupVisible(false);
  };

  const DropdownOptions = [
    "Personal Note",
    "Work Note",
    "Study Note",
    "Shopping Note",
  ];

  const [category, setCategory] = useState(DropdownOptions[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [postNote] = usePostNoteMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCategoryChange = (data) => {
    setCategory(data.category);
  };

  const userID = localStorage.getItem("userId");

  const onSubmit = async (data) => {
    setIsSaveButtonClicked(false);
    setPopupVisible(false);
    const options = {
      data: {
        title: data.title,
        noteDescription: data.noteDescription,
        category: category,
        userID: userID,
        bgColor: "#ffec99",
      },
    };
    try {
      const result = await postNote(options).unwrap();
      const { statusCode, status } = result;

      if (statusCode === 200) {
        toast.success("Note Added Successfully");

        reset();
      }
      if (status === 409) {
        toast.error("This Note Already Exists");
      }
    } catch (error) {
      if (error.status === 409) {
        toast.error("This Note Already Exists");
      }
    }
    setIsSaveButtonClicked(true);
  };

  console.log(isPopupVisible, !isPopupVisible, isSaveButtonClicked);
  useEffect(() => {
    if (!isPopupVisible && isSaveButtonClicked) {
      handleSubmit(onSubmit)();
    }
  }, [isPopupVisible]);

  return (
    <div className="flex justify-center mb-5">
      <button
        className="btn capitalize rounded-lg  bg-blue-900 hover:bg-blue-900  text-white "
        onClick={handleCardClick}
      >
        Add Note{" "}
        <span className="text-xl">
          {" "}
          <BiNotepad />
        </span>
      </button>

      <dialog id="my_modal_2" className=" modal ">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-box w-11/12 bg-base-300 h-96 max-w-2xl "
        >
          <div className="flex justify-between">
            <div className="dropdown rounded-lg dropdown-hover">
              <p
                tabIndex={0}
                className=" capitalize btn text-xs  btn-sm bg-blue-900 hover:bg-blue-900 text-white rounded-lg  "
                onClick={toggleDropdown}
              >
                Category : {category ? category : DropdownOptions[0]}
                {dropdownOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
              </p>

              {dropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2  shadow bg-base-100 rounded-box w-52"
                >
                  {DropdownOptions.map((option, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          handleCategoryChange({ category: option });
                          toggleDropdown();
                        }}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
                className="btn btn-sm capitalize rounded-lg btn-primary mr-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  handleCloseModal();
                }}
                className="btn  capitalize btn-sm rounded-lg btn-error"
              >
                close
              </button>
            </div>
          </div>

          <div className="lg:mt-10  py-2 md:px-10  ">
            <input
              type="text"
              placeholder="Title"
              className="input font-bold w-full md:w-full rounded-lg focus:outline-none focus:border-blue-500   mb-2"
              {...register("title", { required: true })}
            />

            <textarea
              placeholder="Take a note..."
              className="font-bold textarea w-full md:w-full mt-5 mb-5  rounded-lg focus:outline-none focus:border-blue-500  h-40"
              {...register("noteDescription", { required: true })}
            ></textarea>
          </div>

          <div className="md:hidden block ">
            <button
              onClick={() => {
                handleSubmit(onSubmit)();
                handleCloseModal();
              }}
              className="btn btn-sm capitalize rounded-lg btn-primary mr-2"
            >
              Save
            </button>
            <button
              onClick={() => {
                handleCloseModal();
              }}
              className="btn  capitalize btn-sm rounded-lg btn-error"
            >
              close
            </button>
          </div>
        </form>

        <form
          method="dialog"
          onClick={handleCloseModal}
          className="modal-backdrop"
        >
          <button>Save</button>
        </form>
      </dialog>
    </div>
  );
};

export default TakeNote;
