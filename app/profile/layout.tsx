"use client";
import { NavDrawer } from "../../components";

export default function ProfileLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div style={{ display: "flex", width: "100%" }}>
			<NavDrawer />
			<div style={{ width: "75%" }}>{children}</div>
		</div>
	);
}