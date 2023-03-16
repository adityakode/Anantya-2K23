import React, { useState, useEffect } from "react";
import { CardCss } from "../styles";
import Data from "../API/card-data";
import { NavLink } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFirebase, firebaseApp } from "../context/Firebase";

const auth = getAuth(firebaseApp);

const Card = () => {
	const firebase = useFirebase();

	const [data, setData] = useState(Data);
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// Yes, user is logged in
				setUser(user);
			} else {
				// User is logged out
				console.log("You are logged out");
				setUser(null);
			}
		});
	}, []);

	if (user === null) {
		return (
			<>
				<div className="bg-1-gradient"></div>
				<div className="card-main-container row">
					<div className="bg-2-gradient">.</div>
					{data.map((elem) => {
						return (
							<div className="card col-lg-4">
								<img src={elem.image} alt="image" />
								<div className="data">
									<h1 className="card-title">{elem.event_name}</h1>
									<p className="card-subtitle">dd/mm/yyyy</p>
									<p className="card-info">{elem.short_description}</p>
									<div className="btn">
										<button
											onClick={() => firebase.signupWithGoogle()}
											className="card-btn">
											LogIn
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</>
		);
	}

	return (
		<>
			<div className="card-main-container row  ">
				{data.map((elem) => {
					return (
						<div className="card col-lg-4">
							<img
								src="https://t4.ftcdn.net/jpg/05/59/08/01/240_F_559080129_4fWvQkVrQQCAJxaLFstZIfmWUW7DEgQ2.jpg"
								alt="image"
							/>
							<div className="data">
								<h1 className="card-title">{elem.event_name}</h1>
								<p className="card-subtitle">dd/mm/yyyy</p>
								<p className="card-info">{elem.short_description}</p>
								<div style={{ textAlign: "center" }}>
									<NavLink to={"/about" + elem.id} className="nav-link">
										<button className="raise">Register</button>
									</NavLink>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Card;
