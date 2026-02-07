import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Content from "../components/Content";

export default function Layout({ children }) {
	
	
	return (
		<div className="bg-[#e5e1ea] min-h-screen">
			<Navbar/>
			{children}
            <Content/>
		</div>
	);
}
