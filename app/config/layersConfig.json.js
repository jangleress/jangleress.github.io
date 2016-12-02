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
	"id": "polynya",
	"title": {
		"en": "Polynya",
		"fr": "Polynies"
	},
	"source": "arcgis",
	"attribution": "Data created for RACER - WWF Global Arctic Programme Prepared by: David Currie, P.Eng. Canatec Associates International Ltd. January 2012. Report available at: http://webmap.geoanalytic.com/download/wwf/polynya_report.html ",
	"path": "Oceans/Polynya/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "important_areas",
	"featureAttributeMap": {
		"featureDescription": {
			"en": "Type",
			"fr": "Type_F"
		}
	},
	"featureStyle": {
		"attribute": "Code",
		"NWP": {
		  "title": {
				"en": "North Water polynya",
				"fr": "Polynie des eaux du Nord"
			},
			"style": {
				"color": "#00507e",
				"weight": 1,
				"opacity": 0.5
			}
		},
		"P": {
    	"title": {
    		"en": "Polynya (other)",
    		"fr": "Polynies (autres)"
    	},		  
			"style": {
				"color": "#00507e",
				"weight": 1,
				"opacity": 0.3
			}
		}
	}
}, {
	"id": "skeena_projects",
	"title": {
		"en": "Proposed industrial development (Skeena Region)",
		"fr": "Développement industriel proposé (région de Skeena)"
	},
	"source": "arcgis",
	"attribution": "Compiled by WWF-Canada, SkeenaWild Conservation Trust and Skeena Watershed Conservation Coalition (SWCC) <br> updated October-November 2013",
	"path": "Oceans/Skeena_LNG/MapServer/0/",
	"type": "point",
	"ocean": "pacific",
	"category": "human",
	"subcategory": "community",
	"featureAttributeMap": {
		"title": {
			"en": "Name",
			"fr": "Name_F"
		}
	},
	"style": {
		"fillColor": "#ff9000",
		"opacity": 0.9,
		"color": "#db7700",
		"weight":1
	},
	"clusterOptions": {
		"cluster": false
	}
}, {
	"id": "ebsa_atlantic",
	"contentid": "ebsa",
	"title": {
		"en": "Ecologically and biologically significant areas",
		"fr": "Zones d’importance écologique et biologique"
	},
	"style": {
		"color": "#007337",
		"opacity": 0.2,
		"weight": 1
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"attribution": "Fisheries and Oceans Canada",
	"source": "arcgis",
	"path": "Oceans/ebsa/MapServer/0/",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "ecology",
	"subcategory": "important_areas",
	"queryArgs": {
		"where": "Coast='Atlantic'",
		"outSR": "5937"
	}
}, {
	"id": "ebsa_pacific",
	"contentid": "ebsa",
	"title": {
		"en": "Ecologically and biologically significant areas",
		"fr": "Zones d’importance écologique et biologique"
	},
	"style": {
		"color": "#007337",
		"opacity": 0.2,
		"weight": 1
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/ebsa/MapServer/0/",
	"type": "polygon",
	"ocean": "pacific",
	"category": "ecology",
	"subcategory": "important_areas",
	"queryArgs": {
		"where": "Coast='Pacific'",
		"outSR": "5937"
	}
}, {
	"id": "ebsa_arctic",
	"contentid": "ebsa",
	"title": {
		"en": "Ecologically and biologically significant areas",
		"fr": "Zones d’importance écologique et biologique"
	},
	"style": {
		"color": "#007337",
		"opacity": 0.2,
		"weight": 1
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Nom"
		}
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/ebsa/MapServer/0/",
	"type": "polygon",
	"ocean": "arctic",
	"category": "ecology",
	"subcategory": "important_areas",
	"queryArgs": {
		"where": "Coast='Arctic'",
		"outSR": "5937"
	}
}, {
	"id": "iba_pacific",
	"contentid": "iba",
	"title": {
		"en": "Important Bird Areas",
		"fr": "Zones importantes pour les oiseaux"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "NAME",
			"fr": "NAME"
		}
	},
	"source": "arcgis",
	"attribution": "Bird Studies Canada and The Canadian Nature Federation. 2004. Important Bird Areas of Canada Database. Port Rowan, Ontario: Bird Studies Canada. To access the Canadian IBA directory: http://www.bsc-eoc.org/iba/ibasites.html. Full metadata for this layer: http://www.bsc-eoc.org/website/metadata/caniba_poly.xml",
	"path": "Oceans/iba/MapServer/0/",
	"ocean": "pacific",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "important_areas",
	"style": {
		"color": "#edab00",
		"fillOpacity": 0.5
	},
	"queryArgs": {
		"where": "Coast='Pacific'"
	}
}, {
	"id": "iba_atlantic",
	"contentid": "iba",
	"title": {
		"en": "Important Bird Areas",
		"fr": "Zones importantes pour les oiseaux"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "NAME",
			"fr": "NAME"
		}
	},
	"source": "arcgis",
	"attribution": "Bird Studies Canada and The Canadian Nature Federation. 2004. Important Bird Areas of Canada Database. Port Rowan, Ontario: Bird Studies Canada. To access the Canadian IBA directory: http://www.bsc-eoc.org/iba/ibasites.html. Full metadata for this layer: http://www.bsc-eoc.org/website/metadata/caniba_poly.xml",
	"path": "Oceans/iba/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "important_areas",
	"style": {
		"color": "#edab00",
		"fillOpacity": 0.5
	},
	"queryArgs": {
		"where": "Coast='Atlantic'"
	}
}, {
	"id": "iba_arctic",
	"contentid": "iba",
	"title": {
		"en": "Important Bird Areas",
		"fr": "Zones importantes pour les oiseaux"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "NAME",
			"fr": "NAME"
		}
	},
	"source": "arcgis",
	"attribution": "Bird Studies Canada and The Canadian Nature Federation. 2004. Important Bird Areas of Canada Database. Port Rowan, Ontario: Bird Studies Canada. To access the Canadian IBA directory: http://www.bsc-eoc.org/iba/ibasites.html. Full metadata for this layer: http://www.bsc-eoc.org/website/metadata/caniba_poly.xml",
	"path": "Oceans/iba/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "important_areas",
	"style": {
		"color": "#edab00",
		"fillOpacity": 0.5
	},
	"queryArgs": {
		"where": "Coast='Arctic'"
	}
}, {
	"id": "beluga_arctic",
	"title": {
		"en": "Beluga distribution",
		"fr": "Répartition des bélougas"
	},
	"featureAttributeMap": {
		"featureDescription": {
			"en": "DESCR",
			"fr": "DESCR_F"
		}
	},
	"source": "arcgis",
	"attribution": "Reeves RR, Ewins PJ, Agbayani S, Heide-Jørgensen MP, Kovacs KM, Lydersen C, Suydam R, Elliott W, Polet G, van Dijk Y, Blijleven R. Distribution of endemic cetaceans in relation to hydrocarbon development and commercial shipping in a warming arctic. Marine Policy (2013), http://dx.doi.org/10.1016/j.marpol.2013.10.005i",
	"path": "Oceans/Beluga_Distribution/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#12bedd"
	},
  "sortBy" : "OBJECTID", 
	"featureStyle": {
		"attribute": "DESCR",
		"Annual-range": {
			"title": {
				"en": "Annual range",
				"fr": "Aire de distribution annuelle"
			},
			"style": {
				"color": "#3fd5f0"
			}
		},
		"Summer-range": {
			"title": {
				"en": "Summer range",
				"fr": "Aire de distribution estivale"
			},
			"style": {
				"color": "#12bedd",
				"weight": 1
			}
		}
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
	"id": "bowhead",
	"title": {
		"en": "Bowhead distribution",
		"fr": "Répartition des baleines boréales"
	},
	"featureAttributeMap": {
		"featureDescription": {
			"en": "DESCR",
			"fr": "DESCR_F"
		}
	},
	"source": "arcgis",
	"attribution": "Reeves RR, Ewins PJ, Agbayani S, Heide-Jørgensen MP, Kovacs KM, Lydersen C, Suydam R, Elliott W, Polet G, van Dijk Y, Blijleven R. Distribution of endemic cetaceans in relation to hydrocarbon development and commercial shipping in a warming arctic. Marine Policy (2013), http://dx.doi.org/10.1016/j.marpol.2013.10.005i",
	"path": "Oceans/Bowhead_Distribution/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
  "sortBy" : "OBJECTID",
	"featureStyle": {
		"attribute": "DESCR",
		"Annual-range": {
			"title": {
				"en": "Annual range",
				"fr": "Aire de distribution annuelle"
			},      
			"style": {
				"color": "#2294dd"
			}
		},
		"Summer-range": {
			"title": {
				"en": "Summer range",
				"fr": "Aire de distribution estivale"
			},      
			"style": {
				"color": "#0172ba",
				"weight": 1
			}
		}
	}
}, {
	"id": "narwhal",
	"title": {
		"en": "Narwhal distribution",
		"fr": "Répartition des narvals"
	},
	"source": "arcgis",
	"attribution": "Reeves RR, Ewins PJ, Agbayani S, Heide-Jørgensen MP, Kovacs KM, Lydersen C, Suydam R, Elliott W, Polet G, van Dijk Y, Blijleven R. Distribution of endemic cetaceans in relation to hydrocarbon development and commercial shipping in a warming arctic. Marine Policy (2013), http://dx.doi.org/10.1016/j.marpol.2013.10.005i",
	"path": "Oceans/Narwhal_Distribution/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"featureAttributeMap": {
		"featureDescription": {
			"en": "DESCR",
			"fr": "DESCR_F"
		}
	},
  "sortBy" : "OBJECTID",
	"featureStyle": {
		"attribute": "DESCR",
		"Annual-range": {
			"title": {
				"en": "Annual range",
				"fr": "Aire de distribution annuelle"
			},
			"style": {
				"fillColor": "#1093aa"
			}
		},
		"Summer-range": {
			"title": {
				"en": "Summer range",
				"fr": "Aire de distribution estivale"
			},
			"style": {
				"fillColor": "#017286"
			}
		}
	}
}, {
	"id": "orca",
	"title": {
		"en": "Resident orca critical habitat",
		"fr": "Habitat essentiel de l’épaulard résident"
	},
	"featureAttributeMap": {
		"featureDescription": {
			"en": "Status",
			"fr": "status_f"
		}
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "Oceans/PacificKillerWhaler/MapServer/0/",
	"ocean": "pacific",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",  
	"featureStyle": {
		"attribute": "Status",
		"Designated": {
			"title": {
				"en": "Designated",
				"fr": "Désignée"
			},
			"style": {
				"fillColor": "#0076bd"
			}
		},
		"Proposed": {
			"title": {
				"en": "Proposed",
				"fr": "Proposée"
			},
			"style": {
				"fillColor": "#32adf7"
			}
		}
	}
}, {
	"id": "humpback_pacific",
	"title": {
		"en": "Humpback whale proposed critical habitat",
		"fr": "Habitat essentiel proposé pour la baleine à bosse"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "Oceans/HumpbackWhale/MapServer/0/",
	"ocean": "pacific",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#004a76",
		"fillOpacity": 0.5
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
	"id": "salmon_atlantic",
	"title": {
		"en": "Salmon critical habitat ",
		"fr": "Habitat essentiel du saumon"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "Oceans/Salmon_CH/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "fish",
	"style": {
		"color": "#f85e2e",
		"fillOpacity": 0.5
	}
}, {
	"id": "bass_atlantic",
	"title": {
		"en": "Striped bass critical habitat",
		"fr": "Habitat essentiel du bar rayé"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada - Species at Risk Program",
	"path": "Oceans/StripedBass_CH/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "fish",
	"style": {
		"color": "#8a2502",
		"fillOpacity": 0.8
	}
}, {
	"id": "pbear",
	"title": {
		"en": "Polar bear denning",
		"fr": "Tanière d’ours polaire"
	},
	"source": "arcgis",
	"attribution": "International Polar Bear Conservation Centre (IPBCC)",
	"path": "Oceans/PolarBearDenning/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "wildlife",
	"subcategory": "marine_mammal",
	"style": {
		"color": "#0dca9b"
	}
}, {
	"id": "eelgrass",
	"title": {
		"en": "Eelgrass Beds",
		"fr": "Lits de zostères"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.d8fiuxka",
		"retinaId": "webteamwwf.2ms54d20",
		"printId": "webteamwwf.5x27ti4d",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"attribution": "British Columbia Conservation Analysis, 2009. http://bcmca.ca/",
	"ocean": "pacific",
	"type": "raster",
	"category": "ecology",
	"subcategory": "important_areas",
	"style": {
		"color": "#B7EC62",
		"opacity": 1,
		"fillOpacity": 0.5,
		"weight": 4
	},
	"key": {
		"type": "polygon"
	}
}, {
	"id": "corals_pacific",
	"contentid": "corals",
	"title": {
		"en": "Fisheries closures to protect cold-water corals and sponges ",
		"fr": "Fermetures de pêcheries pour protéger les coraux et éponges d’eaux froides"
	},
	"featureAttributeMap": {
		"featureDescription": {
			"en": "closure",
			"fr": "closure_f"
		},
		"featureTitle": "Name"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/Closures_Corals_Sponges/MapServer/0/",
	"ocean": "pacific",
	"type": "polygon",
	"category": "planning",
	"subcategory": "fisheries_closures",
	"queryArgs": {
		"where": "Coast='Pacific'"
	},
	"featureStyle": {
		"attribute": "closure",
		"DFO-closures": {
			"title": {
				"en": "DFO closures",
				"fr": "Fermetures décrétées par le MPO"
			},
			"style": {
				"color": "#e50303",
				"opacity":0.4,
				"weight": 1
			}
		}
	}
}, {
	"id": "corals_arctic",
	"contentid": "corals",
	"title": {
		"en": "Fisheries closures to protect cold-water corals and sponges",
		"fr": "Fermetures de pêcheries pour protéger les coraux et éponges d’eaux froides"
	},
	"featureAttributeMap": {
		"featureDescription": {
			"en": "closure",
			"fr": "closure_f"
		},
		"featureTitle": "Name"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/Closures_Corals_Sponges/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "planning",
	"subcategory": "fisheries_closures",
	"queryArgs": {
		"where": "Coast='Arctic'"
	},
	"featureStyle": {
		"attribute": "closure",
		"DFO-closures": {
			"title": {
				"en": "DFO closures",
				"fr": "Fermetures décrétées par le MPO"
			},
			"style": {
				"color": "#e50303",
				"opacity":0.4,
				"weight": 1
			}
		},
		"Voluntary-closures": {
			"title": {
				"en": "Voluntary closures",
				"fr": "Fermetures volontaires"
			},
			"style": {
				"color": "#d45050",
				"opacity":0.4,
				"weight": 1
			}
		}
	}
}, {
	"id": "corals_atlantic",
	"contentid": "corals",
	"title": {
		"en": "Fisheries closures to protect cold-water corals and sponges",
		"fr": "Fermetures de pêcheries pour protéger les coraux et éponges d’eaux froides"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/Closures_Corals_Sponges/MapServer/0/",
	"ocean": "atlantic",
	"type": "polygon",
	"category": "planning",
	"subcategory": "fisheries_closures",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	},
	"featureAttributeMap": {
		"featureDescription": {
			"en": "closure",
			"fr": "closure_f"
		},
		"featureTitle": "Name"
	},
	"featureStyle": {
		"attribute": "closure",
		"DFO-closures": {
			"title": {
				"en": "DFO closures",
				"fr": "Fermetures décrétées par le MPO"
			},
			"style": {
				"color": "#e50303",
				"opacity":0.4,
				"weight": 1
			}
		},
		"NAFO-closures": {
			"title": {
				"en": "NAFO closures",
				"fr": "Fermetures décrétées par l’OPANO"
			},
			"style": {
				"color": "#8a0202",
				"opacity":0.4,
				"weight": 1
			}
		}
	}
}, {
	"id": "fish_arctic",
	"title": {
		"en": "Traditional knowledge of fishing areas",
		"fr": "Connaissances traditionnelles relatives aux zones de pêche"
	},
	"source": "arcgis",
	"attribution": "Joint Secretariat Inuvialuit Settlement Region, 2014 <br> Nunavut Planning Commission, 2014",
	"path": "Oceans/Arctic_Fishing/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "human",
	"subcategory": "fishing",
	"style": {
		"color": "#ce75ae",
		"fillOpacity": 0.4
	}
}, {
	"id": "tidal_energy_sites_atlantic",
	"title": {
		"en": "In-stream tidal energy sites",
		"fr": "Sites d’énergie marémotrice"
	},
	"featureAttributeMap": {
		"title": {
			"en": "name",
			"fr": "name"
		}
	},
	"source": "arcgis",
	"attribution": "Fundy Ocean Research Center for Energy (FORCE)<br> Fundy Tidal <br> WWF-Canada",
	"path": "Oceans/Tidal_Sites/MapServer/0/",
	"ocean": "atlantic",
	"type": "point",
	"category": "human",
	"subcategory": "renewables",
	"style": {
		"fillColor": "#ebc701",
		"color": "#bb9e01",
		"opacity":0.9,
		"weight":1
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
	"category": "human",
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
}, {
	"id": "shipping_pacific",
	"title": {
		"en": "Shipping density, 2010",
		"fr": "Densité du trafic maritime (2010)"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.1gzd8in0",
		"retinaId": "webteamwwf.cwpifpci",
		"printId": "webteamwwf.0opiqaal",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8,
		"opacity": 0.7
	},
	"attribution": "MARIN (Maritime Activity and Risk Investigation Network); Oil in Canadian Waters Research Working Group",
	"ocean": "pacific",
	"type": "raster",
	"category": "human",
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
			"fillColor": "#161b16"
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
}, {
	"id": "shipping_arctic",
	"title": {
		"en": "Shipping routes, 2013",
		"fr": "Routes de navigation (2013)"
	},
	"hint": {
		"en": "Each line for one transit",
		"fr": "Chaque ligne représente un passage"
	},
	"type": "raster",
	"source": "mapbox",
	"attribution": "Vard Marine Inc, A Fincantieri Company, 2015",
	"ocean": "arctic",
	"category": "human",
	"subcategory": "shipping",
	"key": {
		"type": "line"
	},
	"options": {
		"id": "webteamwwf.d7bkf4ry",
		"retinaId": "webteamwwf.620iobpp",
		"printId": "webteamwwf.8w4yw4st",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA"
	}
}, {
	"id": "seaice_medmin",
	"contentid": "seaice",
	"title": {
		"en": "Sea ice, Median Minimum (1981- 2010)",
		"fr": "Glace de mer, minimum médian (1981-2010)"
	},
	"source": "arcgis",
	"attribution": "National Snow & Ice Data Centre: Sea ice, 2015. https://nsidc.org/",
	"path": "Oceans/SeaIce_MedMin_1981_2010/MapServer/0/",
	"ocean": "arctic",
	"type": "line",
	"category": "ecology",
	"subcategory": "seaice",
	"group": "seaiceextent",
	"style": {
		"color": "#ff5353",
		"weight":2
	}
}, {
	"id": "seaice_medmax",
	"contentid": "seaice",
	"title": {
		"en": "Sea ice, Median Maximum (1981-2010)",
		"fr": "Glace de mer, maximum médian (1981-2010)"
	},
	"source": "arcgis",
	"attribution": "National Snow & Ice Data Centre: Sea ice, 2015. https://nsidc.org/",
	"path": "Oceans/SeaIce_MedMax_1981_2010/MapServer/0/",
	"ocean": "arctic",
	"type": "line",
	"category": "ecology",
	"subcategory": "seaice",
	"group": "seaiceextent",
	"style": {
		"color": "#cf33cd",
		"weight":2
	}
}, {
	"id": "seaice_min",
	"contentid": "seaice",
	"title": {
		"en": "Sea ice, Minimum 2015 (September)",
		"fr": "Glace de mer, minimum (septembre 2015)"
	},
	"source": "arcgis",
	"attribution": "National Snow & Ice Data Centre: Sea ice, 2015. https://nsidc.org/",
	"path": "Oceans/SeaIce_Min_09_2015/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "seaice",
	"group": "seaiceextent",
	"style": {
		"fillColor": "#ff5353",
		"fillOpacity":0.05,
		"opacity":0.9,
		"color": "#ff5353",
		"weight":1
	}
}, {
	"id": "seaice_max",
	"contentid": "seaice",
	"title": {
		"en": "Sea ice, Maximum 2015 (March)",
		"fr": "Glace de mer, maximum (mars 2015)"
	},
	"source": "arcgis",
	"attribution": "National Snow & Ice Data Centre: Sea ice, 2015. https://nsidc.org/",
	"path": "Oceans/SeaIce_Max_03_2015/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "seaice",
	"group": "seaiceextent",
	"style": {
		"fillColor": "#cf33cd",
		"fillOpacity":0.05,
		"opacity":0.95,
		"color": "#cf33cd",
		"weight":1
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
	"category": "ecology",
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
	"id": "aoi_arctic",
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
	"ocean": "arctic",
	"category": "ecology",
	"subcategory": "protected",
  "group": "mpa",  
	"icon": {
		"type": "marker"
	},
	"queryArgs": {
		"where": "Coast='Arctic'"
	},
	"style": {
		"fillColor": "#007840",
		"opacity": 0.9,
		"color": "#01572f",
		"weight": 1
	}
}, {
	"id": "aoi_pacific",
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
	"ocean": "pacific",
	"category": "ecology",
	"subcategory": "protected",
  "group": "mpa",  
	"icon": {
		"type": "marker"
	},
	"queryArgs": {
		"where": "Coast='Pacific'"
	},
	"style": {
		"fillColor": "#007840",
		"opacity": 0.9,
		"color": "#01572f",
		"weight": 1
	}
}, {
	"id": "cnp_pacific",
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
	"ocean": "pacific",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Pacific'"
	}
}, {
	"id": "cnp_arctic",
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
	"ocean": "arctic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Arctic'"
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
	"category": "ecology",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	}
}, {
	"id": "mpa_points_pacific",
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
	"ocean": "pacific",
	"category": "ecology",
	"subcategory": "protected",
	"group": "mpa",
	"queryArgs": {
		"where": "Coast='Pacific'"
	},
	"style": {
		"fillColor": "#003a88",
		"opacity": 0.9,
		"color": "#00275b",
		"weight": 1
	}
}, {
	"id": "mpa_points_arctic",
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
	"ocean": "arctic",
	"type": "point",
	"category": "ecology",
	"subcategory": "protected",
	"group": "mpa",
	"queryArgs": {
		"where": "Coast='Arctic'"
	},
	"style": {
		"fillColor": "#003a88",
		"opacity": 0.9,
		"color": "#00275b",
		"weight": 1
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
	"category": "ecology",
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
	"id": "mpa_pacific",
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
		"weight": 1
	},
	"source": "arcgis",
	"attribution": "The Oceans Program, Fisheries and Oceans Canada",
	"path": "Oceans/DFO_MPAs_Polygons/MapServer/0/",
	"type": "polygon",
	"ocean": "pacific",
	"category": "ecology",
	"subcategory": "protected",
	"group": "mpa",
	"queryArgs": {
		"where": "Coast='Pacific'"
	}
}, {
	"id": "mpa_arctic",
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
		"weight": 1
	},
	"source": "arcgis",
	"attribution": "The Oceans Program, Fisheries and Oceans Canada",
	"path": "Oceans/DFO_MPAs_Polygons/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "protected",
	"group": "mpa",
	"queryArgs": {
		"where": "Coast='Arctic'"
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
	"category": "ecology",
	"subcategory": "protected",
	"group": "mpa",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	}
}, {
	"id": "nmca_pacific",
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
	"ocean": "pacific",
	"category": "ecology",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Pacific'"
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
				"opacity":0.6,
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
				"opacity":0.8,
				"weight":1
			}
		}
	}
}, {
	"id": "nmca_arctic",
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
	"ocean": "arctic",
	"category": "ecology",
	"subcategory": "protected",
	"queryArgs": {
		"where": "Coast='Arctic'"
	},
	"featureStyle": {
		"attribute": "status",
		"Proposed": {
			"title": {
				"en": "Proposed",
				"fr": "Proposée"
			},
			"style": {
				"color": "#67c511",
				"opacity":0.5,
				"weight":1
			}
		}
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
	"category": "ecology",
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
	"id": "pncima",
	"title": {
		"en": "Pacific North Coast Integrated Management Area",
		"fr": "Zone de gestion intégrée de la côte nord du Pacifique"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada Atlas of the Pacific North Coast Integrated Management Area, 2016, http://www.pncima.org/site/atlas.html",
	"path": "Oceans/PNCIMA/MapServer/0/",
	"type": "polygon",
	"ocean": "pacific",
	"category": "planning",
	"subcategory": "regional_msp",
	"style": {
		"color": "#e5f02e",
		"opacity":0.3,
		"weight": 1
	}
}, {
	"id": "mapp",
	"title": {
		"en": "Marine Plan Partnership for the North Pacific Coast",
		"fr": "Partenariat de planification marine pour la côte nord du Pacifique"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Subregion",
			"fr": "Sub_F"
		}
	},
	"style": {
		"color": "#b46211",
		"opacity":0.2,
		"weight": 1
	},
	"source": "arcgis",
	"attribution": "Marine Plan Partnership for the North Pacific Coast, 2016",
	"path": "Oceans/MaPP_Subregions/MapServer/0/",
	"type": "polygon",
	"ocean": "pacific",
	"category": "planning",
	"subcategory": "regional_msp"
}, {
	"id": "nlup",
	"title": {
		"en": "Nunavut Land Use Plan",
		"fr": "Plan d’aménagement du territoire du Nunavut"
	},
	"source": "arcgis",
	"attribution": "Land Use Designations, Draft Nunavut Land Use Plan (DNLUP), produced by Nunavut Planning Commission, 2014 ",
	"path": "Oceans/NLUP/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "planning",
	"subcategory": "regional_msp",
	"queryArgs": {
		"where": "Coast='Arctic'"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Desg",
			"fr": "Desg_F"
		}
	},
	"featureStyle": {
		"attribute": "Desg",
		"Protected-areas": {
			"title": {
				"en": "Protected areas",
				"fr": "Aires protégées"
			},
			"style": {
				"color": "#76b600",
				"opacity":0.2,
				"weight": 1
			}
		},
		"Special-management-areas": {
			"title": {
				"en": "Special management areas",
				"fr": "Zones spéciales de gestion"
			},
			"style": {
				"color": "#989784",
				"opacity":0.2,
				"weight": 1
			}
		}
	}
}, {
	"id": "hunting",
	"title": {
		"en": "Subsistence harvest areas",
		"fr": "Aires de prise à des fins de subsistance"
	},
	"source": "arcgis",
	"attribution": "Nunavut Atlas (1992), Gwich’in Settlement Region Area map (2003), Inuit Land Use and Occupancy Project Report (1976), Schedule A – Land Use Designations map (2010) from the Labrador Inuit Settlement Area (LISA) Regional Planning Authority, Sahtu Special Harvesting Areas & FGH/Colville Lake Group Trappnig Areas Map (2010), Thaydene Nene Map Series (2006), and WMAC's Aklavik Local and Traditional Knowledge about Porcupine Caribou publication (2009) / Braund, Stephen R. & Associates downloaded from BOEM - The Bureau of Ocean Energy Management, 2009",
	"path": "Oceans/SubsistenceHarvestAreas/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "human",
	"subcategory": "traditional",
	"style": {
		"fillColor": "#dea681",
		"fillOpacity": 0.3
	}
}, {
	"id": "bsp",
	"title": {
		"en": "Beaufort Sea Partnership",
		"fr": "Partenariat de la mer de Beaufort"
	},
	"source": "arcgis",
	"attribution": "GeoGratis, Government of Canada, Natural Resources Canada, Earth Sciences Sector, Surveyor General Branch, 2014 Joint Secretariat Inuvialuit Settlement Region, 2014 The Department of Indian Affairs and Northern Development, 2014",
	"path": "Oceans/BS_InuvialuitLandClaim/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "planning",
	"subcategory": "regional_msp",
	"style": {
		"color": "#e5f02e",
		"opacity":0.3,
		"weight": 1
	}
}, {
	"id": "mnwa",
	"title": {
		"en": "Proposed Marine National Widlife Areas",
		"fr": "Réserves nationales de faune en milieu marin proposées"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Name_FR"
		}
	},
	"source": "arcgis",
	"attribution": "Parks Canada, 2016 <br> Conservation Areas Reporting and Tracking System (CARTS) - Canadian Council on Ecological Areas (CCEA), 2015 / International Union for Conservation of Nature (IUCN) and United Nations Environment Programme (UNEP), 201",
	"path": "Oceans/pNMWA/MapServer/0/",
	"type": "polygon",
	"ocean": "pacific",
	"category": "ecology",
	"subcategory": "protected",
	"style": {
		"color": "#0dca9b",
		"weight": 1
	}
}, {
	"id": "rop",
	"title": {
		"en": "Scotian Shelf, Bay of Fundy, Atlantic Ocean Regional Oceans Plan",
		"fr": "Plan régional pour les océans relatif au plateau néo-écossais, à la côte de l’Atlantique et à la baie de Fundy"
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/ScotianShelf_BOF/MapServer/0/",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "planning",
	"subcategory": "regional_msp",
		"style": {
		"color": "#e5f02e",
		"opacity":0.4,
		"weight": 1
	}
}, {
	"id": "mb_pacific",
	"contentid": "mb",
	"title": {
		"en": "Marine bioregions",
		"fr": "Biorégions marines"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Name_F"
		}
	},
	"style": {
		"color": "#446362",
		"fillColor": "#73a5a3",
		"opacity":0.3,
		"weight": 1
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/Bioregions/MapServer/0/",
	"type": "polygon",
	"ocean": "pacific",
	"category": "planning",
	"subcategory": "federal_planning",
	"queryArgs": {
		"where": "Coast='Pacific'"
	}
}, {
	"id": "mb_arctic",
	"contentid": "mb",
	"title": {
		"en": "Marine bioregions",
		"fr": "Biorégions marines"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Name_F"
		}
	},
	"style": {
		"color": "#446362",
		"fillColor": "#73a5a3",
		"opacity":0.3,
		"weight": 1
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/Bioregions/MapServer/0/",
	"type": "polygon",
	"ocean": "arctic",
	"category": "planning",
	"subcategory": "federal_planning",
	"queryArgs": {
		"where": "Coast='Arctic'"
	}
}, {
	"id": "mb_atlantic",
	"contentid": "mb",
	"title": {
		"en": "Marine bioregions",
		"fr": "Biorégions marines"
	},
	"featureAttributeMap": {
		"featureTitle": {
			"en": "Name",
			"fr": "Name_F"
		}
	},
	"style": {
		"color": "#446362",
		"fillColor": "#73a5a3",
		"opacity":0.3,
		"weight": 1
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/Bioregions/MapServer/0/",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "planning",
	"subcategory": "federal_planning",
	"queryArgs": {
		"where": "Coast='Atlantic'"
	}
}, {
	"id": "lia",
	"title": {
		"en": "Last Ice Area",
		"fr": "Dernier refuge de glace"
	},
	"source": "arcgis",
	"attribution": "WWF Global Arctic Program 2016. Last Ice Area. http://www.wwf.ca/conservation/arctic/lia/",
	"path": "Oceans/LastIceArea/MapServer/0/",
	"ocean": "arctic",
	"type": "polygon",
	"category": "ecology",
	"subcategory": "seaice",
	"style": {
		"color": "#a6d2d5",
		"opacity":0.4,
		"weight":1
	}
}, {
	"id": "MT_Herring",
	"title": {
		"en": "Herring ",
		"fr": "Hareng"
	},
	"hint": {
		"en": "Catch weight (kg), 2010-2014",
		"fr": "Poids des prises (kg), 2010-2014"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.0xcb8vlj",
		"retinaId": "webteamwwf.4i7heirm",
		"printId": "webteamwwf.a0y4egt3",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "maritimes",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"0 - 44",
				"fr":"0 - 44"
			},
			"fillColor": "#F5BFDE"
		}, {
			"title": {
				"en": "45 - 1,541",
				"fr": "45 - 1541"
			},
			"fillColor": "#F09FCD"
		}, {
			"title": {
				"en":"1,542 - 24,000",
				"fr":"1542 - 24 000"
			},
			"fillColor": "#EB7FBD"
		}, {
			"title": {
				"en":"24,001 - 105,769",
				"fr": "24 001 - 105 769"
			},
			"fillColor": "#E455A7"
		}, {
			"title": {
				"en":"105,770 - 13,233,053",
				"fr": "105 770 - 13 233 053"
			},
			"fillColor": "#DD2A91"
		}]
	}
}, {
	"id": "MT_Cod",
	"title": {
		"en": "Cod",
		"fr": "Morue"
	},
	"hint": {
		"en": "Catch weight (kg), 2010-2014",
		"fr": "Poids des prises (kg), 2010-2014"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.5by2q7iu",
		"retinaId": "webteamwwf.c0cjdk5f",
		"printId": "webteamwwf.5fzkmtob",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "maritimes",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"0 - 17",
				"fr":"0 - 17"
			},
			"fillColor": "#e0b2d4"
		}, {
			"title": {
				"en":"18 - 80",
				"fr":"18 - 80"
			},
			"fillColor": "#d28cc0"
		}, {
			"title": {
				"en":"81 - 308",
				"fr":"81 - 308"
			},
			"fillColor": "#c366ab"
		}, {
			"title": {
				"en":"309 - 1,324",
				"fr": "309 - 1324"
			},
				
			"fillColor": "#ae338f"
		}, {
			"title": {
				"en":"1,325 - 132,910",
				"fr":"1325 - 132 910"
			},
			"fillColor": "#9b0073"
		}]
	}
}, {
	"id": "MT_Lobster",
	"title": {
		"en": "Lobster",
		"fr": "Homard"
	},
	"hint": {
		"en": "Catch weight (kg), 2010-2014",
		"fr": "Poids des prises (kg), 2010-2014"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.55i8p82h",
		"retinaId": "webteamwwf.8p1o2lyz",
		"printId": "webteamwwf.cu4xvste",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "maritimes",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"3 - 285",
				"fr":"3 - 285"
			},
			"fillColor": "#E0B2B2"
		}, {
			"title":{
				"en":"286 - 709",
				"fr":"286 - 709"
			},
			"fillColor": "#D18C8C"
		}, {
			"title": {
				"en":"710 - 2,384",
				"fr":"710 - 2384"
			},
			"fillColor": "#C26666"
		}, {
			"title": {
				"en":"2,385 - 7,890",
				"fr":"2385 - 7890"
			},
			"fillColor": "#AD3333"
		}, {
			"title": {
				"en":"7,890 - 70,290",
				"fr":"7890 - 70 290"
			},
			"fillColor": "#990000"
		}]
	}
}, {
	"id": "MT_Snowcrab",
	"title": {
		"en": "Snow crab",
		"fr": "Crabe des neiges"
	},
	"hint": {
		"en": "Catch weight (kg), 2010-2014",
		"fr": "Poids des prises (kg), 2010-2014"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.azme0fow",
		"retinaId": "webteamwwf.dr01sqqk",
		"printId": "webteamwwf.75sergul",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "maritimes",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"2 - 2,838",
				"fr":"2 - 2838"
			},
			"fillColor": "#ffb2b2"
		}, {
			"title": {
				"en":"2,839 - 6,411",
				"fr":"2839 - 6411"
			},
			"fillColor": "#ff8c8c"
		}, {
			"title": {
				"en":"6,412 - 13,431",
				"fr":"6412 - 13 431"
			},
			"fillColor": "#ff6666"
		}, {
			"title": {
				"en":"13,432 - 31,189",
				"fr":"13 432 - 31 189"
			},
			"fillColor": "#ff3f3f"
		}, {
			"title": {
				"en":"31,190 - 624,236",
				"fr":"31 190 - 624 236"
			},
			"fillColor": "#ff0000"
		}]
	}
}, {
	"id": "NL_AtlanticHalibut",
	"title": {
		"en": "Atlantic halibut",
		"fr": "Flétan de l’Atlantique"
	},
	"hint": {
		"en": "Catch weight (kg), 2008-2011",
		"fr": "Poids des prises (kg), 2008-2011"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.al9l972m",
		"retinaId": "webteamwwf.2r8oy62u",
		"printId": "webteamwwf.3ji4ypxp",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "nl",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"20 - 553",
				"fr":"20 - 553"
			},
			"fillColor": "#ffb4c9"
		}, {
			"title": {
				"en":"554 - 1,409",
				"fr":"554 - 1409"
			},
			"fillColor": "#ff8eae"
		}, {
			"title": {
				"en":"1,410 - 2,848",
				"fr":"1410 - 2848"
			},
			"fillColor": "#ff6993"
		}, {
			"title": {
				"en":"2,849 - 9,052",
				"fr":"2849 - 9052"
			},
			"fillColor": "#ff4378"
		}, {
			"title": {
				"en":"9,053 - 132,868",
				"fr":"9053 - 132 868"
			},
			"fillColor": "#ff054b"
		}]
	}
}, {
	"id": "NL_GreenlandHalibut",
	"title": {
		"en": "Greenland halibut",
		"fr": "Flétan du Groenland"
	},
	"hint": {
		"en": "Catch weight (kg), 2008-2011",
		"fr": "Poids des prises (kg), 2008-2011"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.cahkomw2",
		"retinaId": "webteamwwf.43e08z8h",
		"printId": "webteamwwf.7galnol6",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "nl",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title":{
				"en":"50 - 2,378",
				"fr":"50 - 2378"
			},
			"fillColor": "#ecb3c8"
		}, {
			"title": {
				"en":"2,379 - 7,157",
				"fr":"2379 - 7157"
			},
			"fillColor": "#e28ead"
		}, {
			"title": {
				"en":"7,158 - 25,688",
				"fr":"7158 - 25 688"
			},
			"fillColor": "#d96892"
		}, {
			"title": {
				"en":"25,689 - 134,260",
				"fr":"25 689 - 134 260"
			},
			"fillColor": "#CD366E"
		}, {
			"title": {
				"en":"134,261 - 1,814,400",
				"fr":"134 261 - 1 814 400"
			},
			"fillColor": "#C0044A"
		}]
	}
}, {
	"id": "NL_Redfish",
	"title": {
		"en": "Redfish",
		"fr": "Sébaste"
	},
	"hint": {
		"en": "Catch weight (kg), 2008-2011",
		"fr": "Poids des prises (kg), 2008-2011"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.dmvg1ss5",
		"retinaId": "webteamwwf.aft1gcr5",
		"printId": "webteamwwf.cs4pwmdv",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "nl",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"96 - 1,615",
				"fr":"96 - 1615"
			},
			"fillColor": "#edb6b3"
		}, {
			"title": {
				"en":"1,616 - 6,867",
				"fr":"1616 - 6867"
			},
			"fillColor": "#e4918d"
		}, {
			"title":{ 
				"en":"6,868 - 20,337",
				"fr":"6868 - 20 337"
			},
			"fillColor": "#db6d67"
		}, {
			"title": {
				"en":"20,338 - 61,183",
				"fr":"20 338 - 61 183"
			},
			"fillColor": "#cf3c34"
		}, {
			"title": {
				"en":"61,184 - 930,559",
				"fr":"61 184 - 930 559"
			},
			"fillColor": "#c40b02"
		}]
	}
}, {
	"id": "NL_SeaScallop",
	"title": {
		"en": "Sea scallop",
		"fr": "Pétoncle géant"
	},
	"hint": {
		"en": "Catch weight (kg), 2008-2011",
		"fr": "Poids des prises (kg), 2008-2011"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.ad4w359f",
		"retinaId": "webteamwwf.65h39p1u",
		"printId": "webteamwwf.an8c58dm",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "nl",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"1,964 - 3,148",
				"fr":"1964 - 3148"
			},
			"fillColor": "#f9c9b8"
		}, {
			"title": {
				"en":"3,149 - 10,688",
				"fr":"3149 - 10 688"
			},
			"fillColor": "#f6af95"
		}, {
			"title": {
				"en":"10,689 - 151,881",
				"fr":"10 689 - 151 881"
			},
			"fillColor": "#f39472"
		}, {
			"title": {
				"en":"151,882 - 393,612",
				"fr":"151 882 - 393 612"
			},
			"fillColor": "#ef7143"
		}, {
			"title": {
				"en":"393,613 - 816,333",
				"fr":"393 613 - 816 333"
			},
			"fillColor": "#eb4e14"
		}]
	}
}, {
	"id": "NL_Cod",
	"title": {
		"en": "Cod",
		"fr": "Morue"
	},
	"hint": {
		"en": "Catch weight (kg), 2008-2011",
		"fr": "Poids des prises (kg), 2008-2011"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.4oef9g2j",
		"retinaId": "webteamwwf.2yy2sn4o",
		"printId": "webteamwwf.bnjo83eo",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "atlantic",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"group": "nl",
	"style": {
		"opacity": 0.8
	},
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"0 - 797",
				"fr":"0 - 797"
			},
			"fillColor": "#d6b3d2"
		}, {
			"title": {
				"en":"798 - 3,592",
				"fr":"798 - 3592"
			},
			"fillColor": "#c28ebb"
		}, {
			"title": {
				"en":"3,593 - 10,160",
				"fr":"3593 - 10 160"
			},
			"fillColor": "#ad68a4"
		}, {
			"title": {
				"en":"10,161 - 28,350",
				"fr":"10 161 - 28 350"
			},
			"fillColor": "#923686"
		}, {
			"title": {
				"en":"28,351 - 2,2562,824",
				"fr":"28 351 - 2 2562 824"
			},
			"fillColor": "#780469"
		}]
	}
}, {
	"id": "crab_pacific",
	"title": {
		"en": "Dungeness Crab",
		"fr": "Crabe dormeur"
	},
	"hint": {
		"en": "Catch weight (kg), 2005-2009",
		"fr": "Poids des prises (kg), 2005-2009"
	},
	"source": "mapbox",
	"options": {
		"id": "webteamwwf.dd8j7kua",
		"retinaId": "webteamwwf.348r0xt8",
		"printId": "webteamwwf.2v6xlhnp",
		"accessToken": "pk.eyJ1Ijoid2VidGVhbXd3ZiIsImEiOiJjaXExejY1cmowMDM3aHNtMnFkM2Z2MXRwIn0.3p5OK5m142-mavANxW9TlA",
		"minZoom": 1,
		"maxZoom": 8
	},
	"ocean": "pacific",
	"attribution":"Fisheries and Oceans Canada",
	"type": "raster",
	"category": "human",
	"subcategory": "fishing",
	"key": {
		"type": "categorical",
		"categories": [{
			"title": {
				"en":"0 - 13,425",
				"fr":"0 - 13 425"
			},
			"fillColor": "#d6b3d2"
		}, {
			"title": {
				"en":"13,426 - 33,563",
				"fr":"13 426 - 33 563"
			},
			"fillColor": "#c28ebb"
		}, {
			"title": {
				"en":"33,564 - 70,482",
				"fr":"33 564 - 70 482"
			},
			"fillColor": "#ad68a4"
		}, {
			"title": {
				"en":"70,482- 130,895",
				"fr":"70 482- 130 895"
			},
			"fillColor": "#923686"
		}, {
			"title": {
				"en":"130,896- 855,855",
				"fr":"130 896 - 855 855"
			},
			"fillColor": "#780469"
		}]
	}
}, {
	"id": "salmon_pacific",
	"title": {
		"en": "Salmon",
		"fr": "Saumon"
	},
	"hint": {
		"en": "Number of salmon caught, 2003-2007",
		"fr": "Nombre de saumons capturés, 2003-2007"
	},
	"style": {
		"fillOpacity": 0.7,
		"weight": 0
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/PC_Salmon/MapServer/0/",
	"ocean": "pacific",
	"type": "polygon",
	"category": "human",
	"subcategory": "fishing",
	"featureAttributeMap": {
		"featureTitle": {
			"en": "code",
			"fr": "code"
		}
	},
	"style": {
		"opacity": 0.6
	},
	"featureStyle": {
		"attribute": "code",
		"A": {
			"title": {
				"en": "100 - 26,000",
				"fr": "100 - 26 000"
			},
			"style": {
				"fillColor": "#fbb69c"
			}
		},
		"B": {
			"title": {
				"en": "26,001 - 150,000",
				"fr": "26 001 - 150 000"
			},
			"style": {
				"fillColor": "#fb9d7c"
			}
		},
		"C": {
			"title": {
				"en": "150,001 -  1,450,000",
				"fr": "150 001 -  1 450 000"
			},
			"style": {
				"fillColor": "#fa7d52"
			}
		},
		"D": {
			"title": {
				"en": "1,450,001 - 11,770,400",
				"fr": "1 450 001 - 11 770 400"
			},
			"style": {
				"fillColor": "#f85e2e"
			}
		}
	}
}, {
	"id": "herring_pacific",
	"title": {
		"en": "Roe Herring",
		"fr": "Pêche au hareng rogué"
	},
	"hint": {
		"en": "Catch weight (tonnes), 1989-2008",
		"fr": "Poids des prises (tonnes), 1989-2008"
	},
	"style": {
		"fillOpacity": 0.6,
		"weight": 0
	},
	"source": "arcgis",
	"attribution": "Fisheries and Oceans Canada",
	"path": "Oceans/PC_Herring/MapServer/0/",
	"ocean": "pacific",
	"type": "polygon",
	"category": "human",
	"subcategory": "fishing",
	"featureStyle": {
		"attribute": "code",
		"A": {
			"title": {
				"en": "145 - 2,858",
				"fr": "145 - 2858"
			},
			"style": {
				"fillColor": "#F09FCD"
			}
		},
		"B": {
			"title": {
				"en": "2,859 - 13,470",
				"fr": "2859 - 13 470"
			},
			"style": {
				"fillColor": "#EB7FBD"
			}
		},
		"C": {
			"title": {
				"en": "13,471 - 50,128",
				"fr": "13 471 - 50 128"
			},
			"style": {
				"fillColor": "#E455A7"
			}
		},
		"D": {
			"title": {
				"en": "50,129 - 227,475",
				"fr": "50 129 - 227 475"
			},
			"style": {
				"fillColor": "#DD2A91"
			}
		}
	}
}, {
	"id": "oilgas_arctic",
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
	"attribution": "Aboriginal Affairs and Northern Development Canada, 2016 <br> Government of Greenland, Bureau of Minerals and Petroleum. ",
	"path": "Oceans/oilgas/MapServer/0/",
	"type": "polygon",
	"ocean": "arctic",
	"category": "human",
	"subcategory": "oil_gas",
	"queryArgs": {
		"where": "Coast='Arctic'"
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
		"FP": {
			"title": {
				"en": "Former Permit",
				"fr": "Ancien permis"
			},
			"style": {
				"color": "#a9a89b"
			}
		}
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
	"source": "arcgis",
	"attribution": "Canada-Nova Scotia Offshore Petroleum Board, http://www.cnsopb.ns.ca/ <br> Canada-Newfoundland & Labrador Offshore Petroleum Board, http://www.cnlopb.ca/",
	"path": "Oceans/oilgas/MapServer/0/",
	"type": "polygon",
	"ocean": "atlantic",
	"category": "human",
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
