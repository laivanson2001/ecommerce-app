import React from "react";

const CustomInput = ({
	type,
	name,
	placeholder,
	classname,
	value,
	onChange,
	onBlur,
	disabled,
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
				disabled={disabled}
			/>
		</div>
	);
};

export default CustomInput;
