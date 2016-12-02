[
  { 
    "layersConfig" : "app/config/layersConfig.json.js",
    "mapConfig" : "app/config/mapConfig.json.js",
    "modules" : [
      {
        "id" : "home",        
        "class" : "module-home",
        "query_allow" : ["conf","modal","view","layers","modalid","clayers","cdata"],
        "layers" : "oceans",        
        "mapview" : "65|-90|4||850|500"
      },
      {
        "id" : "page",        
        "class" : "module-page",
        "query_allow" : ["conf","modal","view","modalid","clayers","cdata"]
      },
      {
        "id" : "ocean",        
        "class" : "module-ocean",
        "mapControl" : false,
        "query_allow" : ["conf","view", "layers","modal","modalid","clayers","cdata"]
      },
      {
        "id" : "story",
        "class" : "module-story",
        "mapControl" : false,
        "query_allow" : ["conf","view", "layers","modal","modalid","clayers","cdata"]
      },
      {
        "id" : "layers",
        "class" : "module-layers",
        "mapControl" : true,
        "query_allow" : ["conf","view", "layers", "cat", "ocean","mode","modal","modalid","clayers","cedit","cdata"]
      }
    ],    
    "oceans" : [
      {
        "id" : "pacific",
        "order" : 1,
        "marker" : "52|-130",
        "layers" : "pacific",                
        "mapview" : "52.5|-129.5|6||550|650" 
      },
      {
        "id" : "arctic",
        "order" : 2,
        "marker" : "74.5|-99",
        "layers" : "arctic",
        "mapview" : "74.5|-98|6||1300|820"
      },
      {
        "id" : "atlantic",
        "order" : 3,
        "marker" : "46|-62",
        "layers" : "atlantic",                        
        "mapview" : "48|-61|6||950|1100"
      }
    ],    
    "stories" : [
      { 
        "id" : "skeena",
        "ocean" : "pacific",
        "title" : {
          "en" : "North Coast & Skeena River Estuary",
          "fr" : "Côte nord et estuaire de la rivière Skeena"
        },
        "marker" : "53.9161|-131.5428",
        "mapview" : "52|-130|7||850|700"
      },
      { 
        "id" : "salish",
        "ocean" : "pacific",
        "marker" : "49.0292|-123.5032",
        "title" : {
          "en" : "Salish Sea",
          "fr" : "Mer de Salish"
        },
        "mapview" : "49|-127|7||850|700"
      },
      { 
        "id" : "beaufort",
        "ocean" : "arctic",
        "marker" : "70.2604|-132.472",
        "title" : {
          "en" : "Beaufort Sea",
          "fr" : "Mer de Beaufort"
        },
        "mapview" : "70.58|-132.13|7||850|700"
      },
      { 
        "id" : "northwest",
        "ocean" : "arctic",
        "marker" : "74.0712|-84.7929",
        "title" : {
          "en" : "Northwest Passage",
          "fr" : "Passage du Nord-Ouest"
        },
        "mapview" : "74.2578|-89.3114|7||850|700"
      },      
      { 
        "id" : "polynya",
        "ocean" : "arctic",
        "marker" : "76.135|-75.5376",
        "title" : {
          "en" : "North Water Polynya",
          "fr" : "Polynie des eaux du Nord"
        },
        "mapview" : "76.1623|-74.7852|7||850|700"
      },
      { 
        "id" : "stlawrence",
        "ocean" : "atlantic",
        "marker" : "48.5|-61.2",
        "title" : {
          "en" : "Gulf of St. Lawrence",
          "fr" : "Golfe du Saint-Laurent"
        },
        "mapview" : "47.9411|-62.1695|6||500|500"
      },      
      { 
        "id" : "fundy",
        "ocean" : "atlantic",
        "marker" : "45.2|-65.5",
        "title" : {
          "en" : "Bay of Fundy",
          "fr" : "Baie de Fundy"
        },
        "mapview" : "45.2|-65.5|6||500|500"
      },
      { 
        "id" : "grandbanks",
        "ocean" : "atlantic",
        "marker" : "45.9|-52.5",
        "title" : {
          "en" : "Grand Banks",
          "fr" : "Grands Bancs"
        },
        "mapview" : "46.2342|-52.6646|6||500|500"
      }     
    ],      
    "pages" : [
      {
        "id" : "learn-more",
        "parent" : "learn-more",
        "title" : {
          "en" : "Learn More",
          "fr" : "En savoir plus"
        }        
      },
      {
        "id" : "learn-more-challenges",
        "parent" : "learn-more",
        "title" : {
          "en" : "Challenges",
          "fr" : "Défis"
        }        
      },
      {
        "id" : "learn-more-planning",
        "parent" : "learn-more",
        "title" : {
          "en" : "Ocean Planning",
          "fr" : "Planification des océans"
        }        
      },
      {
        "id" : "take-action",
        "parent" : "take-action",
        "title" : {
          "en" : "Take Action",
          "fr" : "Agir"
        }        
      },
      {
        "id" : "take-action-wwf",
        "parent" : "take-action",
        "title" : {
          "en" : "What WWF is doing",
          "fr" : "Ce que fait le WWF"
        }        
      },      
      {"id" : "help"},
      {"id" : "basemap"},
      {"id" : "references"}
    ]    
  }  
]
