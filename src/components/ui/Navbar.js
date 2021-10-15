import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
	return (
		<div className="navbar navbar-dark bg-dark mb-4">
			<span className="navbar-brand">Jorge</span>

			<button className="btn btn-outline-danger">
				<i class="fas fa-sign-out-alt m-2">Salir</i>
				<FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
			</button>
		</div>
	);
};
