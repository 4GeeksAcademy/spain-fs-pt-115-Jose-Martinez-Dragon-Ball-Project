import React from "react";

export const Footer = () => (
	<footer className="footer-impresionante">
		<div className="footer-contenido">
			
			{/* La Esfera del Dragón */}
			<div className="dragon-ball-container">
				<div className="dragon-ball">
					{/* Las estrellas de la esfera */}
					<span className="estrella e1">★</span>
					<span className="estrella e2">★</span>
					<span className="estrella e3">★</span>
					<span className="estrella e4">★</span>
				</div>
			</div>

			{/*Redes Sociales */}
			<p>Creado con la energía de un Genkidama</p>
			<div className="social-links">
				<a href="https://github.com/Josemtnezng" aria-label="GitHub"><i className="fab fa-github"></i></a>
				<a href="https://www.linkedin.com/in/josemtnezng/" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
				<a href="https://www.instagram.com/joseincode/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
			</div>

		</div>
	</footer>
);