[{
	"id": "basemap",
	"contentid": "bathymetry",
	"basemap": true,
	"title": {
		"en": "Water depths (m)",
		"fr": "Profondeurs d’eau (m)"
	},
	"type": "raster",
	"source": "mapbox",
	"attribution": "Natural Earth",
	"category": "basemap",
	"options": {
		"id": "webteamwwf.1gwk26lq",
		"retinaId": "webteamwwf.3w753j6k",
		"printId": "webteamwwf.dane3tr5",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 9
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": "0-200m",
			"fillColor": "#d2eff6"
		}, {
			"title": "200-1000m",
			"fillColor": "#c6ecf5"
		}, {
			"title": "1000-2000m",
			"fillColor": "#b8e6f1"
		}, {
			"title": "2000-3000m",
			"fillColor": "#abe2ee"
		}, {
			"title": "3000-4000m",
			"fillColor": "#94d8e7"
		}, {
			"title": "4000-5000m",
			"fillColor": "#82d1e2"
		}, {
			"title": "5000-6000m",
			"fillColor": "#73c9db"
		}, {
			"title": "6000-7000m",
			"fillColor": "#69c3d6"
		}, {
			"title": "7000-8000m",
			"fillColor": "#62bfd2"
		}, {
			"title": ">8000m",
			"fillColor": "#56bacf"
		}]
	}
}, {
	"id": "oceans",
	"type": "point",
	"source": "appconfig",
	"optional": false,
	"key": false,
	"tooltip": false,
	"style": {
		"fillColor": "#00c8ce",
		"fillOpacity": 0.3,
		"color": "#00c8ce",
		"opacity": 0.8,
		"weight": 1
	},
	"icon": {
		"type": "text-icon-circle",
		"style": {
			"attribute": "id",
			"pacific": {
				"icon": "icon-wwf_pacific-white",
				"fillColor": "#069b97",
				"color": "#fff",
				"size": 104,
				"paddingOuter": 12
			},
			"arctic": {
				"icon": "icon-wwf_arctic-white",
				"fillColor": "#00bcd9",
				"color": "#fff",
				"size": 104,
				"paddingOuter": 12
			},
			"atlantic": {
				"icon": "icon-wwf_atlantic-white",
				"fillColor": "#0094be",
				"color": "#fff",
				"size": 104,
				"paddingOuter": 12
			}
		},
		"title": {
			"attribute": "title"
		}
	}
}, {
	"id": "pacific",
	"type": "point",
	"source": "appconfig",
	"optional": false,
	"key": false,
	"style": {
		"fillColor": "#169F98",
		"fillOpacity": 0.3,
		"color": "#169F98",
		"opacity": 0.8,
		"weight": 1
	},
	"icon": {
		"type": "image",
		"style": {
			"iconUrl": "assets/img/marker/wwf_marker-pacific.png",
			"iconSize": [42, 66],
			"iconAnchor": [21, 62]
		}
	}
}, {
	"id": "atlantic",
	"type": "point",
	"source": "appconfig",
	"optional": false,
	"key": false,
	"style": {
		"fillColor": "#1399B9",
		"fillOpacity": 0.3,
		"color": "#1399B9",
		"opacity": 0.8,
		"weight": 1
	},
	"icon": {
		"type": "image",
		"style": {
			"iconUrl": "assets/img/marker/wwf_marker-atlantic.png",
			"iconSize": [42, 66],
			"iconAnchor": [21, 62]
		}
	}
}, {
	"id": "arctic",
	"type": "point",
	"source": "appconfig",
	"optional": false,
	"key": false,
	"style": {
		"fillColor": "#17C1DC",
		"fillOpacity": 0.3,
		"color": "#17C1DC",
		"opacity": 0.8,
		"weight": 1
	},
	"icon": {
		"type": "image",
		"style": {
			"iconUrl": "assets/img/marker/wwf_marker-arctic.png",
			"iconSize": [42, 66],
			"iconAnchor": [21, 62]
		}
	}
}, {
	"id": "whale_ice",
	"contentid": "ice",
	"title": {
		"en": "Whales found in ice",
		"fr": "Baleines découvertes dans les glaces"
	},
	"featureAttributeMap": {
		"title": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"source": "geojson",
	"attribution": "Dave Ireland",
	"path": "app/data/whale_ice.geojson",
	"type": "point",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "2014_story",
	"icon": {
		"type": "marker"
	},
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"style": {
		"fillColor": "#002069",
		"opacity": 0.9,
		"color": "#01572f",
		"iconSize": [42, 66],
		"weight": 1
	}
}, {
	"id": "whale_ashore",
	"contentid": "ashore",
	"title": {
		"en": "Whales washed ashore",
		"fr": "Baleines échouées"
	},
	"featureAttributeMap": {
		"title": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"source": "geojson",
	"attribution": "Dave Ireland",
	"path": "app/data/whale_ashore.geojson",
	"type": "point",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "2014_story",
	"icon": {
		"type": "marker"
	},
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"style": {
		"fillColor": "#00609c",
		"opacity": 0.9,
		"color": "#01572f",
		"weight": 1
	}
}, {
	"id": "whale_salvage",
	"contentid": "salvage",
	"title": {
		"en": "One whale towed here to salvage",
		"fr": "Baleine remorquée en vue de sa récupération"
	},
	"featureAttributeMap": {
		"title": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"source": "geojson",
	"attribution": "Dave Ireland",
	"path": "app/data/whale_salvage.geojson",
	"type": "point",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "2014_story",
	"icon": {
		"type": "marker"
	},
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"style": {
		"fillColor": "#53c1e8",
		"opacity": 0.9,
		"color": "#01572f",
		"weight": 1
	}
}, {
	"id": "bluewhale",
	"title": {
		"en": "Blue whale areas of known concentration",
		"fr": "Zones de concentration connues de la baleine bleue"
	},
	"source": "geojson",
	"attribution": "Digitized by WWF-Canada from Beauchamp, J., Bouchard, H., de Margerie, P., Otis, N., Savaria, J.-Y., 2009. Recovery Strategy for the blue whale (Balaenoptera musculus), Northwest Atlantic population, in Canada [FINAL]. Species at Risk Act Recovery Strategy Series. Fisheries and Oceans Canada, Ottawa. 62 pp.",
	"path": "app/data/AtlanticBlueWhale.geojson",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#00609c"
	}
}, {
	"id": "beluga",
	"title": {
		"en": "Beluga critical habitat ",
		"fr": "Habitat essentiel du béluga"
	},
	"source": "geojson",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "app/data/StLawrenceBeluga.geojson",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
  "sortBy" : "OBJECTID",
	"style": {
		"color": "#edab00",
		"fillOpacity": 0.7
	}
}, {
	"id": "right",
	"title": {
		"en": "North Atlantic right whale critical habitat",
		"fr": "Habitat essentiel de la Baleine noire/franche de l’Atlantique Nord"
	},
	"source": "geojson",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "app/data/NorthAtlanticRightWhale.geojson",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#ff4040",
		"fillOpacity": 0.7
	}
}, {
	"id": "bottlenose",
	"title": {
		"en": "Northern bottlenose whale critical habitat",
		"fr": "Habitat essentiel de la baleine à bec commune"
	},
	"source": "geojson",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "app/data/NorthernBottlenoseWhale.geojson",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#800080",
		"fillOpacity": 0.7
	}
}, {
	"id": "aoi_atlantic",
	"contentid": "aoi",
	"title": {
		"en": "Marine Protected Areas and Areas of Interest",
		"fr": "Aires marines protégées et sites d’intérêt"
	},
	"featureAttributeMap": {
		"title": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"source": "geojson",
	"attribution": "The Oceans Program, Fisheries and Oceans Canada",
	"path": "app/data/DFO_MPAs_and_AOIs.geojson",
	"type": "point",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "protected",
	"icon": {
		"type": "marker"
	},
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"style": {
		"fillColor": "#007840",
		"opacity": 0.9,
		"color": "#01572f",
		"weight": 1
	}
}, {
	"id": "cnp_atlantic",
	"contentid": "cnp",
	"title": {
		"en": "National Parks and National Marine Conservation Areas",
		"fr": "Parcs nationaux et aires marines nationales de conservation"
	},
	"style": {
		"color": "#157543",
		"weight": 1
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "NAME_E",
			"fr": "NOM_F"
		}
	},
	"source": "geojson",
	"attribution": "Parks Canada, 2016 <br> Conservation Areas Reporting and Tracking System (CARTS) - Canadian Council on Ecological Areas (CCEA), 2015 / International Union for Conservation of Nature (IUCN) and United Nations Environment Programme (UNEP), 2010",
	"path": "app/data/NationalParks_and_NMCAs.geojson",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	}
}, {
	"id": "oilgas_atlantic",
	"contentid": "oilgas",
	"title": {
		"en": "Oil and gas leases and licences",
		"fr": "Concessions et licences pétrolières et gazières"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "type",
			"fr": "type_fr"
		}
	},
	"style": {
		"weight": 1
	},
	"source": "geojson",
	"attribution": "Canada-Nova Scotia Offshore Petroleum Board, http://www.cnsopb.ns.ca/ <br> Canada-Newfoundland & Labrador Offshore Petroleum Board, http://www.cnlopb.ca/",
	"path": "app/data/OilGas.geojson",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "oil_gas",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"featureStyle": {
		"attribute": "code",
		"SDL": {
			"title": {
				"en": "Significant Discovery Licence",
				"fr": "Licence de découverte importante"
			},
			"style": {
				"color": "#d5b900"
			}
		},
		"EL": {
			"title": {
				"en": "Exploration Licence",
				"fr": "Licence d’exploration"
			},
			"style": {
				"color": "#bd7d00"
			}
		},
		"PL": {
			"title": {
				"en": "Production Licence",
				"fr": "Licence de production"
			},
			"style": {
				"color": "#744d01"
			}
		}
	}
}, {
	"id": "shipping_atlantic",
	"title": {
		"en": "Shipping density, 2010",
		"fr": "Densité du trafic maritime (2010)"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.0wmbqlao",
		"retinaId": "webteamwwf.a5zpxhbe",
		"printId": "webteamwwf.b2x0m2fv",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 9,
		"opacity": 0.7
	},
	"attribution": "Koropatnick, T., S.K. Johnston, S. Coffen-Smout, P. Macnab, and A. Szeto. 2012. Development and Applications of Vessel Traffic Maps Based on Long Range Identification and Tracking (LRIT) Data in Atlantic Canada. Can. Tech. Rep. Fish. Aquat. Sci. 2966.",
	"path": "Oceans/AtlanticShipping_5937/MapServer/",
	"ocean": "atlantic",
	"type": "raster",
	"category": "wildlife",
	"subcategory": "shipping",
	"style": {
		"opacity": 0.5
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en": "High intensity",
				"fr": "Forte intensité"
			},
			"fillColor": "#202620"
		}, {
			"title": {
				"en": "Medium intensity",
				"fr": "Intensité moyenne"
			},
			"fillColor": "#4d514d"
		}, {
			"title": {
				"en": "Low intensity",
				"fr": "Basse intensité"
			},
			"fillColor": "#8b8f8b"

		}]
	}
}]
