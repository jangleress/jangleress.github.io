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
		"maxZoom": 8
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
	"id": "nwp_shipping",
	"title": {
		"en": "Northwest Passage",
		"fr": "Passage du Nord-Ouest"
	},
	"optional": false,
	"source": "arcgis",
	"attribution": "Arctic Marine Shipping Assessment Report, April 2009 <br> The Arctic Council and the Protection of the Marine Environment (PAME), a working group under the direction of the Arctic Council.",
	"path": "Oceans/nwp_shipping/MapServer/0/",
	"type": "line",
	"style": {
		"color": "#3c4d54",
		"weight": 1,
		"dashArray": "6,4",
		"opacity": 1
	}
}, {
	"id": "polynya_nw",
	"contentid": "polynya",
	"title": {
		"en": "North Water polynya",
		"fr": "Polynie des eaux du Nord"
	},
	"optional": false,
	"source": "arcgis",
	"attribution": "Data created for RACER - WWF Global Arctic Programme Prepared by: David Currie, P.Eng. Canatec Associates International Ltd. January 2012. Report available at: http://webmap.geoanalytic.com/download/wwf/polynya_report.html ",
	"path": "Oceans/Polynya_NW/MapServer/0/",
	"type": "polygon",
	"style": {
		"color": "#00507e",
		"weight": 1,
		"opacity": 0.5
	}
}, {
	"id": "bluewhale",
	"title": {
		"en": "Blue whale areas of known concentration",
		"fr": "Zones de concentration connue du rorqual bleu"
	},
	"source": "arcgis",
	"attribution": "Digitized by WWF-Canada from Beauchamp, J., Bouchard, H., de Margerie, P., Otis, N., Savaria, J.-Y., 2009. Recovery Strategy for the blue whale (Balaenoptera musculus), Northwest Atlantic population, in Canada [FINAL]. Species at Risk Act Recovery Strategy Series. Fisheries and Oceans Canada, Ottawa. 62 pp.",
	"path": "Oceans/AtlanticBlueWhale/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#4dd5e5"
	}
}, {
	"id": "beluga",
	"title": {
		"en": "Beluga critical habitat ",
		"fr": "Habitat essentiel du bélouga"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "Oceans/StLawrenceBeluga/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
  "sortBy" : "OBJECTID",
	"style": {
		"color": "#12bedd",
		"fillOpacity": 0.8
	}
}, {
	"id": "right",
	"title": {
		"en": "North Atlantic right whale critical habitat",
		"fr": "Habitat essentiel de la baleine noire de l’Atlantique Nord"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "Oceans/RightWhale/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#2f9fcd",
		"fillOpacity": 0.8
	}
}, {
	"id": "bottlenose",
	"title": {
		"en": "Northern bottlenose whale critical habitat",
		"fr": "Habitat essentiel de la baleine à bec commune"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "Oceans/BottlenoseWhale/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#00334c",
		"fillOpacity": 0.7
	}
}, {
	"id": "aoi_atlantic",
	"contentid": "aoi",
	"title": {
		"en": "Areas of Interest",
		"fr": "Zones d’intérêt"
	},
	"featureAttributeMap": {
		"title": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"source": "arcgis",
	"attribution": "The Oceans Program, Fisheries and Oceans Canada",
	"path": "Oceans/DFO_AOIs/MapServer/0/",
	"type": "point",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "protected",
  "group": "mpa",
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
		"en": "National Parks",
		"fr": "Parcs nationaux"
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
	"source": "arcgis",
	"attribution": "Parks Canada, 2016 <br> Conservation Areas Reporting and Tracking System (CARTS) - Canadian Council on Ecological Areas (CCEA), 2015 / International Union for Conservation of Nature (IUCN) and United Nations Environment Programme (UNEP), 2010",
	"path": "Oceans/nationalparks/MapServer/0/",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	}
}, {
	"id": "mpa_points_atlantic",
	"contentid": "mpa",
	"title": {
		"en": "Marine Protected Areas (point locations)",
		"fr": "Zones de protection marine (données de localisation)"
	},
	"featureAttributeMap": {
		"title": {
			"en": "NAME_E",
			"fr": "FIRST_NOM_F"
		}
	},
	"source": "arcgis",
	"attribution": "The Oceans Program, Fisheries and Oceans Canada",
	"path": "Oceans/DFO_MPAs_Points/MapServer/0/",
	"type": "point",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "protected",
	"group": "mpa",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"style": {
		"fillColor": "#003a88",
		"opacity": 0.9,
		"color": "#00275b",
		"weight": 1
	}
}, {
	"id": "mpa_atlantic",
	"contentid": "mpa",
	"title": {
		"en": "Marine Protected Areas (polygons)",
		"fr": "Aires marines protégées (polygones)"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "NAME_E",
			"fr": "FIRST_NOM_F"
		}
	},
	"style": {
		"color": "#003a88",
		"fillOpacity": 0.3,
		"weight": 3
	},
	"source": "arcgis",
	"attribution": "The Oceans Program, Fisheries and Oceans Canada",
	"path": "Oceans/DFO_MPAs_Polygons/MapServer/0/",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "protected",
	"group": "mpa",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	}
}, {
	"id": "nmca_atlantic",
	"contentid": "nmca",
	"title": {
		"en": "National Marine Conservation Areas",
		"fr": "Aires marines nationales de conservation"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Name_F"
		},
		"featureDescription": {
			"en": "status",
			"fr": "status_f"
		}
	},
	"source": "arcgis",
	"attribution": "Conservation Areas Reporting and Tracking System (CARTS) - Canadian Council on Ecological Areas (CCEA), 2015 / International Union for Conservation of Nature (IUCN) and United Nations Environment Programme (UNEP), 2010; Parks Canada, 2016",
	"path": "Oceans/NMCA/MapServer/0/",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "wildlife",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"featureStyle": {
		"attribute": "status",
		"Designated": {
			"title": {
				"en": "Designated",
				"fr": "Désignée"
			},
			"style": {
				"color": "#5d8900",
				"opacity":0.8,
				"weight":1
			}
		},
		"Proposed": {
			"title": {
				"en": "Proposed",
				"fr": "Proposée"
			},
			"style": {
				"color": "#67c511",
				"opacity":0.6,
				"weight":1
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
		"maxZoom": 8,
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
},{
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
	"source": "arcgis",
	"attribution": "Canada-Nova Scotia Offshore Petroleum Board, http://www.cnsopb.ns.ca/ <br> Canada-Newfoundland & Labrador Offshore Petroleum Board, http://www.cnlopb.ca/",
	"path": "Oceans/oilgas/MapServer/0/",
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
}]
