import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import SliderComponent from "./components/Slider";

function App() {
	const [totalAmount, setTotalAmount] = useState(0);
	const [term, setTerm] = useState(0);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [monthlyAmount, setMonthlyAmount] = useState(0);
	const [modalBody, setModalBody] = useState();

	useEffect(() => {
		setMonthlyAmount(() => {
			let result = 0;
			if (term !== 0) {
				result = totalAmount / term;
			}
			return result.toFixed(2);
		});
	}, [totalAmount, term]);

	const handleGetCredit = () => {
		setIsOpenModal(true);
		setModalBody(<p>¡Crédito solicitado con éxito!</p>);
	};

	const handleDisplayDues = () => {
		setIsOpenModal(true);
		setModalBody(
			buildArrayFromTerm.map((cuota) => (
				<p key={cuota.id}>
					Cuota {cuota.id} $ {cuota.monto}
				</p>
			))
		);
	};

	const buildArrayFromTerm = Array.from({ length: term }, (_, i) => ({
		id: i + 1,
		monto: monthlyAmount,
	}));

	const buttonStyle = {
		border: "none",
		color: "white",
		cursor: "pointer",
	};

	const minSliderTermValue = 3;
	const maxSliderTermValue = 24;
	const minSliderAmountValue = 5000;
	const maxSliderAmountValue = 50000;
	const minSliderAmountValueString = "$5.000";
	const maxSliderAmountValueString = "$50.000";

	return (
		<>
			<div style={{ backgroundColor: "#003b6b", padding: "40px" }}>
				<div>
					<h2 style={{ paddingBottom: "80px" }}>Simulá tu crédito</h2>
					<div>
						<SliderComponent
							title="MONTO TOTAL"
							value={totalAmount}
							setValue={setTotalAmount}
							minSliderValue={minSliderAmountValue}
							maxSliderValue={maxSliderAmountValue}
							minSliderValueString={minSliderAmountValueString}
							maxSliderValueString={maxSliderAmountValueString}
							prefix="$"
						/>
						<SliderComponent
							title="PLAZO"
							value={term}
							setValue={setTerm}
							minSliderValue={minSliderTermValue}
							maxSliderValue={maxSliderTermValue}
							minSliderValueString={minSliderTermValue}
							maxSliderValueString={maxSliderTermValue}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#003560",
							marginTop: "40px",
						}}
					>
						<h3 style={{ marginRight: "20px" }}>CUOTA FIJA POR MES</h3>
						<h2>{`$${monthlyAmount}`}</h2>
					</div>
					<div style={{ display: "flex" }}>
						<button
							className={"success-btn"}
							style={{
								...buttonStyle,
								width: "80%",
								marginRight: "15px",
							}}
							onClick={handleGetCredit}
						>
							<p style={{ fontSize: "20px", fontWeight: 900 }}>
								OBTENÉ CRÉDITO
							</p>
						</button>
						<button
							className={"info-btn"}
							style={{
								...buttonStyle,
							}}
							onClick={handleDisplayDues}
						>
							<h3>VER DETALLE DE CUOTAS</h3>
						</button>
					</div>
				</div>
				<Modal
					style={{
						position: "absolute",
						top: "10%",
						overflow: "scroll",
						height: "100%",
						display: "block",
						width: "100%",
					}}
					open={isOpenModal}
					onClose={() => setIsOpenModal(false)}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "40%",
							backgroundColor: "white",
							borderRadius: 20,
							padding: 70,
							margin: "20px auto ",
						}}
					>
						{modalBody}
					</div>
				</Modal>
			</div>
		</>
	);
}

export default App;
