import React from "react";

const CustomInput = ({ type, name, placeholder, classname }) => {
	return (
		<div>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				className={`form-control ${classname}`}
			/>
		</div>
	);
};

export default CustomInput;
