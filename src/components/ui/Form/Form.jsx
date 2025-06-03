import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BASE_URL } from "../../../data/const";
import { toast } from "sonner";

const Form = ({ children, onSubmit, direction = "x", width }) => {
  return (
    <form
      className={`form flex ${direction == "y" ? "flex-col" : "flex-row"
        } w-${width}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
const FormRow = ({ children, direction = "x" }) => {
  return <div className={`form-row ${direction == "y" ? "flex-col" : "flex-row"}`}>{children}</div>;
};
const FormControl = ({
  type = "text",
  placeholder = "",
  label = null,
  required = false,
  onChange,
  value,
  defaultValue,
  width = "full",
  name,
  disabled = false
}) => {
  return (
    <div className={`form-control w-${width}`}>
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      {
        defaultValue ?
          <input
            className="form-input"
            type={type}
            placeholder={placeholder}
            defaultValue={value || ""}
            onChange={onChange}
            required={required}
            id={name}
            name={name}
            disabled={disabled}
          /> : <input
            className="form-input"
            type={type}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            required={required}
            name={name}
            disabled={disabled}

          />
      }
    </div>
  );
};


const FormSelect = ({
  placeholder,
  label,
  required,
  onChange,
  value,
  options,
  width,
  name
}) => {
  return (
    <div className={`form-control w-${width}`}>
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        className="form-input form-select"
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        id={name}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FormSwitch = ({ value, onChange, name }) => {
  return (
    <label htmlFor={name} className="form-switch">
      <input id={name} type="checkbox" checked={value} onChange={onChange} name={name} />
      <div className={`toggle ${value ? "checked" : ""}`}></div>
    </label>
  );
};

const FormBtn = ({ text, icon, onClick }) => {
  return (
    <button className="form-button" aria-label="form-button" type="submit" onClick={onClick}>
      {icon && icon}
      <span>{text}</span>
    </button>
  );
};

const FormImage = ({ label, onChange, width, name }) => {
  return (
    <div className={`form-control w-${width}`}>
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        className="form-input"
        type="file"
        id={name}
        name={name}
        accept="image/png image/jpeg image/jpg"
        onChange={onChange}
      />
    </div>
  );
};
const FormMultiImage = ({ setFieldValue, values, delete_images_array }) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const handleImage = (acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== acceptedFiles.length) {
      toast.error("Only jpeg and png files are allowed", {
        position: "bottom-right",
        duration: 2000,
      });
      return;
    }
    if (values.length + validFiles.length > 8) {
      toast.error("You can upload up to 8 images", {
        position: "bottom-right",
        duration: 2000,
      });
      return;

    }
    setFieldValue("images", [...values, ...validFiles]);
  };

  const removeImage = (index) => {
    const updatedImages = values.filter((_, i) => i !== index);
    setFieldValue("images", updatedImages);
    console.log(updatedImages);
    console.log(values);

    console.log(values[index]);

    if ("id" in values[index]) {
      const deleteArray = delete_images_array;
      deleteArray.push(values[index]?.id);
      setFieldValue("delete_images_array", deleteArray);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleImage,
    multiple: true,
  });

  return (
    <div className="multi-image-upload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drop images here or click to upload</p>
      </div>
      <div className="image-preview">
        {values.map((file, index) => {

          return (
            <div key={index} className="image-item">
              <img src={file instanceof File ? URL.createObjectURL(file) : `${BASE_URL}/${file.src}`} alt={`Preview ${index}`} />
              <button type="button" className="remove-btn" aria-label="close-btn" onClick={() => removeImage(index)}>
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const FormTextarea = ({
  placeholder = "",
  label = null,
  required = false,
  onChange,
  value,
  defaultValue,
  width = "full",
  name,
  rows = 4
}) => {
  return (
    <div className={`form-control w-${width}`}>
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      <textarea
        className="form-textarea"
        placeholder={placeholder}
        value={value || ""}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        id={name}
        name={name}
        rows={rows}
      />
    </div>
  );
};

export { Form, FormRow, FormControl, FormSelect, FormBtn, FormSwitch, FormImage, FormMultiImage, FormTextarea };
