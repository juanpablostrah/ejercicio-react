import { Input, InputAdornment } from "@mui/material";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";

const SliderComponent = ({
	title,
	value,
	setValue,
	minSliderValue,
	maxSliderValue,
	minSliderValueString,
	maxSliderValueString,
	prefix,
}) => {
	const [inputValue, setInputValue] = useState(
		value < minSliderValue
			? minSliderValue
			: value > maxSliderValue
			? maxSliderValue
			: value
	);

	useEffect(() => {
		if (value < minSliderValue) {
			setValue(minSliderValue);
		} else if (value > maxSliderValue) {
			setValue(maxSliderValue);
		}
	}, [value]);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		if (value >= minSliderValue && value <= maxSliderValue) {
			setValue(value);
		}
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<h4>{title}</h4>
				<Input
					style={{
						backgroundColor: "#003b6b",
						color: "white",
						borderColor: "white",
						padding: "6px",
						outline: "none",
						border: "2px white solid",
						fontSize: "20px",
						fontWeight: "bold",
						textAlign: "center",
					}}
					type="number"
					value={inputValue}
					onChange={handleInputChange}
					{...(prefix && {
						startAdornment: (
							<InputAdornment
								sx={{
									color: "red",
								}}
								position="start"
							>
								{prefix}
							</InputAdornment>
						),
					})}
				/>
			</div>
			<Slider
				min={minSliderValue}
				max={maxSliderValue}
				value={value}
				onChange={(newValue) => {
					setInputValue(newValue);
					setValue(newValue);
				}}
			/>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<span style={{ fontWeight: 500, marginTop: "10px" }}>
					{minSliderValueString}
				</span>
				<span style={{ fontWeight: 500, marginTop: "10px" }}>
					{maxSliderValueString}
				</span>
			</div>
		</div>
	);
};

export default SliderComponent;
