import { Player } from '../components/Player/Player';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { AppContextProvider } from '../context/app.context';
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html>
			<head>
				<title>Web Music Player</title>
				<meta name="description" content="Site for listening music" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body>
				<main>
					<AppContextProvider>
						<SearchBar />
						<div>{children}</div>
						<Player />
						<div id="modal-root" />
					</AppContextProvider>
				</main>
			</body>
		</html>
	);
}