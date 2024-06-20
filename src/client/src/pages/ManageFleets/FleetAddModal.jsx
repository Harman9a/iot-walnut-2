import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (!/^[0-9a-zA-Z].*/i.test(values.name)) {
    errors.name = "Invalid";
  }

  if (!values.category) {
    errors.category = "Required";
  } else if (!/^[0-9a-zA-Z].*/i.test(values.category)) {
    errors.category = "Invalid";
  }

  if (!values.admin) {
    errors.admin = "Required";
  } else if (!/^[0-9a-zA-Z].*/i.test(values.admin)) {
    errors.admin = "Invalid";
  }

  return errors;
};

export default function FleetAddModal() {
  const state = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (values) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/addFleet`, values, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-base-200 max-w-[50rem] h-3/4">
        <form method="dialog">
          <button className="btn text-[20px] btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex items-center justify-center flex-col h-full">
          <div className="mt-3 w-3/4">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                      Name
                    </span>
                  </label>
                  <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
                    <input
                      type="text"
                      className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {formik.errors.name ? (
                      <div>{formik.errors.name}</div>
                    ) : null}
                  </span>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                      Select Category
                    </span>
                  </label>
                  <div>
                    <select
                      className="select focus:outline-none focus:border-none w-full  form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow"
                      name="category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                    >
                      <option disabled selected>
                        Select Category
                      </option>
                      <option>Han Solo</option>
                      <option>Greedo</option>
                    </select>
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {formik.errors.category ? (
                      <div>{formik.errors.category}</div>
                    ) : null}
                  </span>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                      Select Admin
                    </span>
                  </label>
                  <div>
                    <select
                      className="select focus:outline-none focus:border-none w-full  form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow"
                      name="admin"
                      onChange={formik.handleChange}
                      value={formik.values.admin}
                    >
                      <option disabled selected>
                        Select Admin
                      </option>
                      <option>Han Solo</option>
                      <option>Greedo</option>
                    </select>
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {formik.errors.admin ? (
                      <div>{formik.errors.admin}</div>
                    ) : null}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="btn text-white gap-2 btn-neutral btn-block rounded text-[17px] font-[500] landing-[19px]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
