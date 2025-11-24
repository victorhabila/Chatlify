import React from "react";

function GenderCheckBox({ onCheckBoxChange, selectedGender }) {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text text-yellow-400">Male</span>
          <input
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
            type="checkbox"
            className="checkbox border-slate-500 text-yellow-400"
          />
        </label>
      </div>

      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-yellow-400">Female</span>
          <input
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
            type="checkbox"
            className="checkbox border-slate-500"
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckBox;
