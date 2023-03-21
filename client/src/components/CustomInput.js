import React from "react";

const CustomInput = ({
	type,
	name,
	placeholder,
	classname,
	value,
	onChange,
	onBlur,
}) => {
	return (
		<div>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				className={`form-control ${classname}`}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	);
};

export default CustomInput;
