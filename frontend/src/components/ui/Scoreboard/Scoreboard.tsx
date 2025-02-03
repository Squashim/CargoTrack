import styles from "./Scoreboard.module.scss";
import podium from "../../../assets/podium.png";
import { useEffect, useState } from "react";
import Select from "../Select/Select";

import { ScoreData } from "../../../types/types";

const Scoreboard = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ScoreData[]>([]);
	const [selectedMonth, setSelectedMonth] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/testData.json");
				const result = await response.json();
				setData(result);

				const month = new Date()
					.toLocaleString("en-US", { month: "long" })
					.toLowerCase();
				setSelectedMonth(month);
			} catch (error) {
				console.error("Błąd przy pobieraniu danych:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const monthlyData = data.find((item) => item.month === selectedMonth) || {
		scoreboard: []
	};

	return (
		<>
			<h2>Tabela wyników</h2>
			<div className={styles.select_container}>
				<h3>Okres trwania:</h3>
				{loading ? (
					<p>Ładowanie...</p>
				) : (
					<Select
						value={selectedMonth}
						onChange={setSelectedMonth}
						options={data}></Select>
				)}
			</div>
			<div className={styles.podium}>
				{loading ? (
					<p>Ładowanie...</p>
				) : (
					<>
						<img src={podium} alt='podium image' draggable='false' />
						<h4 className={styles.first_place}>
							{monthlyData.scoreboard[0]?.companyName}
						</h4>
						<p className={styles.second_place}>
							{monthlyData.scoreboard[1]?.companyName}
						</p>
						<p className={styles.third_place}>
							{monthlyData.scoreboard[2]?.companyName}
						</p>
					</>
				)}
			</div>
			<div className={styles.table}>
				<h3>Ranking najlepszych firm transportowych</h3>

				<table>
					<thead>
						<tr>
							<th>Miejsce</th>
							<th>Nazwa firmy</th>
							<th>Stan konta</th>
							<th>Gracz</th>
						</tr>
					</thead>
					<tbody>
						{monthlyData.scoreboard.map((company, id) => {
							return (
								<tr key={company.companyName}>
									<td>{id + 1}</td>
									<td>{company.companyName}</td>
									<td>{company.balance.toLocaleString()}</td>
									<td>{company.username}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Scoreboard;
