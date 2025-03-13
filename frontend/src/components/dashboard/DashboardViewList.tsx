import BuyBuildings from "./views/BuildingsMarket"
import React from "react"

const DashboardViewList: Record<string, React.FC | null> = {
	"my-properties": null,
	"real-estate-market": BuyBuildings,
	"workers-list": null,
	"hire-worker": null,
	"my-fleet": null,
	"buy-vehicle": null,
	"ongoing-orders": null,
	"completed-orders": null,
	"search-order": null,
	"settings": null,
	"help": null
};

export default DashboardViewList;