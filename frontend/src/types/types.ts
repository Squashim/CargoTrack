export type City = {
	city: string;
	city_ascii: string;
	lat: string;
	lng: string;
	country: string;
	iso2: string;
	iso3: string;
	admin_name: string;
	capital: string;
	population: string;
	id: string;
};

export type Scoreboard = {
	companyName: string;
	balance: number;
	username: string;
};

export type ScoreData = {
	month: string;
	year: string;
	scoreboard: Scoreboard[];
};

export type SelectProps = {
	value: string;
	options: SelectOption[];
	onChange: (value: string) => void;
	placeholder?: string;
};

export type SelectOption = {
	label: string;
	value: string;
};
