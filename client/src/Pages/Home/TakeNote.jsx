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
  };

  useEffect(() => {
    if (!isPopupVisible) {
      handleSubmit(onSubmit)();
    }
  }, [category, isPopupVisible]);

  return (
    <div className="flex justify-center mb-5">
      <button
        className="btn capitalize  btn-primary "
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
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-box w-11/12 bg-base-300 h-64 max-w-2xl "
        >
          <input
            type="text"
            placeholder="Title"
            className="input font-bold input-ghost w-64 md:w-96   mb-2"
            {...register("title", { required: true })}
          />
          <div className="dropdown ml-5 dropdown-hover">
            <p
              tabIndex={0}
              className=" capitalize btn text-xs btn-sm btn-primary ml-1"
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

          <textarea
            placeholder="Take a note..."
            className="font-bold textarea textarea-ghost w-64 md:w-96 mt-5 mb-5   h-32"
            {...register("noteDescription", { required: true })}
          ></textarea>
        </form>

        <form
          method="dialog"
          onClick={handleCloseModal}
          className="modal-backdrop  "
        >
          <button>Save</button>
        </form>
      </dialog>
    </div>
  );
};

export default TakeNote;
