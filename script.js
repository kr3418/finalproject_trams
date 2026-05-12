// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1Ijoia3IzNDE4IiwiYSI6ImNtbnl3Zmx5cjA2cTQycXBtb3JxdXY2YXQifQ.o0QeMLlc__XbEGpIbeWDxQ";

// Initialize map
// Initialize map
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v11",
  center: [-73.93, 40.74],
  zoom: 10.6,
  minZoom: 9.5,
  maxZoom: 16,
  maxBounds: [
    [-74.35, 40.45], // southwest corner
    [-73.55, 41.00]  // northeast corner
  ]
});

// Add navigation controls
map.addControl(new mapboxgl.NavigationControl(), "top-right");

// Intro modal behavior
const introModal = document.getElementById("introModal");
const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", () => {
  introModal.style.display = "none";
});

// Info panel elements
const infoPanel = document.getElementById("infoPanel");
const infoPanelContent = document.getElementById("infoPanelContent");
const closeInfoPanel = document.getElementById("closeInfoPanel");

// Close info panel behavior
closeInfoPanel.addEventListener("click", () => {
  infoPanel.classList.add("hidden");

  clearSectionMarkers();

  cancelAnimationFrame(antPathFrame);
  cancelAnimationFrame(bronxAntPathFrame);
  cancelAnimationFrame(brooklynAntPathFrame);
  cancelAnimationFrame(queensAntPathFrame);

  map.setPaintProperty("manhattan-section-highlight-bg", "line-opacity", 0);
  map.setPaintProperty("manhattan-section-highlight-dash", "line-opacity", 0);

  map.setPaintProperty("bronx-section-highlight-bg", "line-opacity", 0);
  map.setPaintProperty("bronx-section-highlight-dash", "line-opacity", 0);

  map.setPaintProperty("brooklyn-section-highlight-bg", "line-opacity", 0);
  map.setPaintProperty("brooklyn-section-highlight-dash", "line-opacity", 0);

  map.setPaintProperty("queens-section-highlight-bg", "line-opacity", 0);
  map.setPaintProperty("queens-section-highlight-dash", "line-opacity", 0);
});

// Legend button behavior
// Manhattan line button behavior
document.getElementById("manhattanLine").addEventListener("click", () => {
  map.flyTo({
    center: [-73.985, 40.755],
    zoom: 12.2,
    essential: true
  });

  showManhattanPanel();
});
// Bronx line button behavior
document.getElementById("bronxLine").addEventListener("click", () => {
  map.flyTo({
    center: [-73.88, 40.86],
    zoom: 11.8,
    essential: true
  });

  showBronxPanel();
});
// Brooklyn line button behavior
document.getElementById("brooklynLine").addEventListener("click", () => {
  map.flyTo({
    center: [-73.93, 40.64],
    zoom: 11.8,
    essential: true
  });

  showBrooklynPanel();
});
// Queens line button behavior
document.getElementById("queensLine").addEventListener("click", () => {
  map.flyTo({
    center: [-73.82, 40.72],
    zoom: 11.4,
    essential: true
  });

  showQueensPanel();
});

//Panel content functions

// Manhattan full line panel
function showManhattanPanel() {
  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>Manhattan Flagship Line</h2>

    <img src="images/broadway-tram.jpeg" alt="Concept image of a tram through Broadway">

    <p>
      The Manhattan Flagship Line would connect Columbus Circle, Broadway, 34th Street, 
      and Second Avenue with a surface tram corridor designed to improve local access.
      Along Broadway, the line would strengthen short-distance mobility through one of 
      Manhattan’s busiest pedestrian and commercial corridors. Along Second Avenue, it 
      would help fill a north-south transit gap on the East Side.
    </p>

    <p><strong>Click on a section to find out more.</strong></p>

    <div class="section-buttons">
      <button id="broadwaySection">Broadway Section</button>
      <button id="thirtyFourthSection">34th Street Crosstown Section</button>
      <button id="secondAveSection">Second Avenue Section</button>
    </div>
  `;

    document.getElementById("broadwaySection").addEventListener("click", () => {
        showManhattanSection("broadway");
    });

    document.getElementById("thirtyFourthSection").addEventListener("click", () => {
        showManhattanSection("thirtyFourth");
    });

    document.getElementById("secondAveSection").addEventListener("click", () => {
        showManhattanSection("secondAve");
});
}
// Bronx full line panel
function showBronxPanel() {
  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>Bronx Crosstown Line</h2>

    <img src="images/fordham-tram.jpeg" alt="Concept image of a Bronx tram corridor">

    <p>
      The Bronx Crosstown Line would follow the Fordham Road / Pelham Parkway corridor,
      building on one of the Bronx’s busiest east-west travel markets. Rather than replacing
      the Bx12, the tram would provide a higher-capacity surface transit spine connecting
      subway, bus, Metro-North, park, hospital, university, and shopping destinations.
    </p>

    <p><strong>Click on a section to find out more.</strong></p>

    <div class="section-buttons">
      <button id="westBronxSection">West Bronx Section</button>
      <button id="eastBronxSection">East Bronx / Co-op City Section</button>
    </div>
  `;

  document.getElementById("westBronxSection").addEventListener("click", () => {
    showBronxSection("westBronx");
  });

  document.getElementById("eastBronxSection").addEventListener("click", () => {
    showBronxSection("eastBronx");
  });
}
// Brooklyn full line panel
function showBrooklynPanel() {
  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>Brooklyn South Line</h2>

    <img src="images/kings-highway-tram.jpeg" alt="Concept image of a Brooklyn tram corridor">

    <p>
      The Brooklyn South Line would connect Atlantic Avenue to southern Brooklyn through
      Utica Avenue, Flatlands Avenue, and Kings Highway. The line would strengthen local
      north-south travel along Utica Avenue while also improving east-west access across
      southern Brooklyn neighborhoods that are farther from subway service.
    </p>

    <p><strong>Click on a section to find out more.</strong></p>

    <div class="section-buttons">
      <button id="uticaSection">Utica Avenue Section</button>
      <button id="kingsHighwaySection">Flatlands / Kings Highway Section</button>
    </div>
  `;

  document.getElementById("uticaSection").addEventListener("click", () => {
    showBrooklynSection("utica");
  });

  document.getElementById("kingsHighwaySection").addEventListener("click", () => {
    showBrooklynSection("kingsHighway");
  });
}
// Queens full line panel
function showQueensPanel() {
  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>Queens Connector Line</h2>

    <img src="images/flushing-tram.jpeg" alt="Concept image of a Queens tram corridor">

    <p>
      The Queens Connector Line would link Downtown Flushing, central Queens, Kew Gardens,
      Jamaica, and the Belmont Park / UBS Arena area. The line would improve local access
      across Queens by connecting major subway, LIRR, bus, residential, commercial, and
      institutional destinations along a continuous surface transit corridor.
    </p>

    <p><strong>Click on a section to find out more.</strong></p>

    <div class="section-buttons">
      <button id="flushingSection">Flushing Section</button>
      <button id="kewGardensSection">Kew Gardens Section</button>
      <button id="jamaicaSection">Jamaica Section</button>
    </div>
  `;

  document.getElementById("flushingSection").addEventListener("click", () => {
    showQueensSection("flushing");
  });

  document.getElementById("kewGardensSection").addEventListener("click", () => {
    showQueensSection("kewGardens");
  });

  document.getElementById("jamaicaSection").addEventListener("click", () => {
    showQueensSection("jamaica");
  });
}
// Manhattan section panels
function showManhattanSection(section) {
  const sections = {
    broadway: {
      title: "Broadway Section",
      center: [-73.988, 40.756],
      zoom: 13.2,
      transfers: `
<span class="route-pill route-a">A</span>
<span class="route-pill route-c">C</span>
<span class="route-pill route-b">B</span>
<span class="route-pill route-d">D</span>
<span class="route-pill route-1">1</span>
at Columbus Circle & Times square,

<span class="route-pill route-n">N</span>
<span class="route-pill route-q">Q</span>
<span class="route-pill route-r">R</span>
<span class="route-pill route-w">W</span>
near Times Square and Herald Square.
`,
      areas: "Columbus Circle, Times Square, Herald Square, major theaters, retail corridors, pedestrian plazas.",
      importance:
        "This section improves local access along one of Manhattan’s most active walking and commercial corridors, making short trips easier without requiring riders to enter the subway for every movement.",
       markers: [
  {
    title: "Columbus Circle",
    type: "transfer",
    coordinates: [-73.9819, 40.7681],
    description: "Major transfer point for the A/C/B/D/1 trains, right by Central Park."
  },
  {
    title: "Times Square",
    type: "destination",
    coordinates: [-73.9862, 40.7580],
    description: "Major pedestrian, theater, office, and tourism district with nearby subway transfers. The heart of the city!"
  },
  {
    title: "Herald Square",
    type: "transfer",
    coordinates: [-73.9879, 40.7505],
    description: "Important transfer area near the B/D/F/M, N/Q/R/W, PATH, Penn Station, and 34th Street corridor."
  }
] 
    },

    thirtyFourth: {
      title: "34th Street Crosstown Section",
      center: [-73.982, 40.750],
      zoom: 13.4,
transfers: `
<span class="route-pill route-1">1</span>
<span class="route-pill route-2">2</span>
<span class="route-pill route-3">3</span>

<span class="route-pill route-a">A</span>
<span class="route-pill route-c">C</span>
<span class="route-pill route-e">E</span>

<span class="route-pill route-b">B</span>
<span class="route-pill route-d">D</span>
<span class="route-pill route-f">F</span>
<span class="route-pill route-m">M</span>

<span class="route-pill route-n">N</span>
<span class="route-pill route-q">Q</span>
<span class="route-pill route-r">R</span>
<span class="route-pill route-w">W</span>

<span class="route-pill route-4">4</span>
<span class="route-pill route-5">5</span>
<span class="route-pill route-6">6</span>

PATH, LIRR, Metro-North, NJ Transit, and ferry connections nearby.
`,
      areas: "Penn Station, Herald Square, Empire State Building, Bryant Park area, East Midtown.",
      importance:
        "This section strengthens east-west movement across Midtown and connects several major transit hubs, job centers, and destinations along a corridor where surface transit demand is already very high.",
       markers: [
  {
    title: "Penn Station",
    type: "transfer",
    coordinates: [-73.9935, 40.7506],
    description: "Major regional rail and subway hub with connections to Amtrak, LIRR, NJ Transit, A/C/E, 1/2/3, and nearby PATH service."
  },
  {
    title: "Herald Square",
    type: "transfer",
    coordinates: [-73.9879, 40.7505],
    description: "Major subway transfer point near the B/D/F/M and N/Q/R/W lines."
  },
  {
    title: "Empire State Building",
    type: "destination",
    coordinates: [-73.9857, 40.7484],
    description: "Major Midtown destination along the 34th Street corridor."
  },
  {
    title: "East River Ferry / East Midtown",
    type: "destination",
    coordinates: [-73.9718, 40.7435],
    description: "East Side destination area near ferry access, hospitals, residential towers, and Second Avenue connections."
  }
]
    },

    secondAve: {
      title: "Second Avenue Section",
      center: [-73.976, 40.735],
      zoom: 13.1,
transfers: `
<span class="route-pill route-q">Q</span>

<span class="route-pill route-l">L</span>

<span class="route-pill route-f">F</span>
<span class="route-pill route-m">M</span>

<span class="route-pill route-4">4</span>
<span class="route-pill route-5">5</span>
<span class="route-pill route-6">6</span>

M15 Select Bus Service and several crosstown bus routes.
`,
      areas: "East Midtown, Gramercy, East Village, Lower East Side, hospitals, schools, residential corridors, and retail streets.",
      importance:
        "This section helps fill a north-south transit gap on the East Side, especially for local trips that are too short or indirect for subway travel but too long to comfortably walk.",
       markers: [
  {
    title: "East Midtown",
    type: "transfer",
    coordinates: [-73.9730, 40.7490],
    description: "Connection point between the crosstown segment and the Second Avenue corridor."
  },
  {
    title: "East Village",
    type: "destination",
    coordinates: [-73.9820, 40.7275],
    description: "Dense residential, nightlife, education, and local commercial district."
  },
  {
    title: "Lower East Side",
    type: "terminal",
    coordinates: [-73.9895, 40.7185],
    description: "Southern neighborhood anchor with connections to local destinations and nearby subway service."
  },
  {
    title: "NYU / Washington Square Park",
    type: "destination",
    coordinates: [-73.98809, 40.73643],
    description: "# Wagner!"
  }
] 
    }
  };

    const selected = sections[section];
    if (!selected) {
  console.error("No matching Manhattan section found:", section);
  return;
}

console.log("Section selected:", section, selected);

    highlightManhattanSection(section);
    addSectionMarkers(selected.markers);
    map.flyTo({
        center: selected.center,
        zoom: selected.zoom,
        essential: true
    });

  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>${selected.title}</h2>

    <p><strong>Transfer points:</strong><br>
    ${selected.transfers}</p>

    <p><strong>Areas of interest:</strong><br>
    ${selected.areas}</p>

    <p><strong>Why this section matters:</strong><br>
    ${selected.importance}</p>

    <button class="back-button" id="backToManhattan">← Back to full Manhattan line</button>
  `;

document.getElementById("backToManhattan").addEventListener("click", () => {
    clearManhattanHighlight();
    clearSectionMarkers();

  showManhattanPanel();

  map.flyTo({
    center: [-73.985, 40.755],
    zoom: 12.2,
    essential: true
  });
});
}

//Bronx section panels
function showBronxSection(section) {
  const sections = {
    westBronx: {
      title: "West Bronx Section",
      center: [-73.91, 40.86],
      zoom: 13,
transfers: `
<span class="route-pill route-a">A</span>
near Broadway / Inwood,

<span class="route-pill route-1">1</span>
near Broadway / 207th Street,

<span class="route-pill route-4">4</span>
at Jerome Avenue,

<span class="route-pill route-b">B</span>
<span class="route-pill route-d">D</span>
at Fordham Road,

Metro-North at Fordham.
`,
      areas: "University Heights, Fordham Road, Fordham University area, Fordham Plaza, major retail corridors.",
      importance:
        "This section links Upper Manhattan and the West Bronx to Fordham Road, creating a stronger east-west surface transit connection across a corridor already served by very heavy bus demand.",
    markers: [
  {
    title: "Broadway",
    type: "transfer",
    coordinates: [-73.91999, 40.86581],
    description: "Northern connection toward Upper Manhattan. Transfer to the A and 1 trains."
  },
  {
    title: "Jerome Avenue",
    type: "transfer",
    coordinates: [-73.90108, 40.86277],
    description: "Transfer to the 4 train."
  },
    {
    title: "Fordham Road / University Heights",
    type: "transfer",
    coordinates: [-73.89712, 40.86247],
    description: "One of the busiest transit corridors in the Bronx. Transfer to the B/D trains and several bus routes."
  },
  {
    title: "Fordham Plaza",
    type: "transfer",
    coordinates: [-73.8917, 40.8615],
    description: "Major Bronx bus and Metro-North hub."
  },
  {
    title: "Fordham University",
    type: "destination",
    coordinates: [-73.8894, 40.8619],
    description: "Major university campus and institutional destination."
  }
]
    },

    eastBronx: {
      title: "East Bronx / Co-op City Section",
      center: [-73.83, 40.86],
      zoom: 12.4,
transfers: `
<span class="route-pill route-2">2</span>
<span class="route-pill route-5">5</span>

near Pelham Parkway and White Plains Road, with several north-south Bronx bus routes and Co-op City connections.
`,
      areas: "Bronx Zoo, New York Botanical Garden, Pelham Parkway, Jacobi/Einstein medical area, Bay Plaza, Co-op City.",
      importance:
        "This section extends high-capacity local transit toward major East Bronx destinations and Co-op City, improving access in areas where subway coverage is limited.",
        markers: [
  {
    title: "Bronx Zoo",
    type: "destination",
    coordinates: [-73.8770, 40.8506],
    description: "Major cultural and recreational destination in the Bronx."
  },
  {
    title: "Pelham Parkway",
    type: "transfer",
    coordinates: [-73.8672, 40.8572],
    description: "Connection area near the 2/5 subway corridor and major bus routes."
  },
  {
    title: "Bay Plaza / Co-op City",
    type: "terminal",
    coordinates: [-73.8285, 40.8761],
    description: "Major retail, residential, and regional destination in the northeast Bronx."
  }
]
    }
  };

  const selected = sections[section];

  if (!selected) {
    console.error("No matching Bronx section found:", section);
    return;
  }

  highlightBronxSection(section);
  addSectionMarkers(selected.markers);

  map.flyTo({
    center: selected.center,
    zoom: selected.zoom,
    essential: true
  });

  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>${selected.title}</h2>

    <p><strong>Transfer points:</strong><br>
    ${selected.transfers}</p>

    <p><strong>Areas of interest:</strong><br>
    ${selected.areas}</p>

    <p><strong>Why this section matters:</strong><br>
    ${selected.importance}</p>

    <button class="back-button" id="backToBronx">← Back to full Bronx line</button>
  `;

  document.getElementById("backToBronx").addEventListener("click", () => {
    clearBronxHighlight();
    clearSectionMarkers();

    showBronxPanel();

    map.flyTo({
      center: [-73.88, 40.86],
      zoom: 11.8,
      essential: true
    });
  });
}
// Brooklyn section panels
function showBrooklynSection(section) {
  const sections = {
    utica: {
      title: "Utica Avenue Section",
      center: [-73.93, 40.66],
      zoom: 12.4,
transfers: `
<span class="route-pill route-a">A</span>
<span class="route-pill route-c">C</span>
at Utica Avenue,

<span class="route-pill route-3">3</span>
<span class="route-pill route-4">4</span>

near Crown Heights–Utica Avenue,

LIRR and subway connections near Atlantic Avenue–Barclays Center.
`,
      areas: "Crown Heights, Weeksville, East Flatbush, Kingsbrook area, local retail corridors, schools, and residential neighborhoods.",
      importance:
        "This section strengthens north-south transit on Utica Avenue, a major Brooklyn corridor where subway coverage is limited south of Eastern Parkway and bus demand is high.",
        markers: [
  {
    title: "Atlantic Avenue",
    type: "transfer",
    coordinates: [-73.93032, 40.67748],
    description: "Major Brooklyn corridor. Transfers to the A/C trains."
  },
  {
    title: "Crown Heights–Utica Avenue",
    type: "transfer",
    coordinates: [-73.9318, 40.6688],
    description: "Local hub. Transfer to the 2/3 and 4/5 trains ."
  },
  {
    title: "Kingsbrook / East Flatbush",
    type: "destination",
    coordinates: [-73.9326, 40.6607],
    description: "Residential and institutional destination along the Utica Avenue corridor."
  }
]
    },

    kingsHighway: {
      title: "Flatlands / Kings Highway Section",
      center: [-73.94, 40.61],
      zoom: 12.3,
transfers: `
<span class="route-pill route-b">B</span>
<span class="route-pill route-q">Q</span>

near Kings Highway,

<span class="route-pill route-f">F</span>

at McDonald Avenue,

<span class="route-pill route-n">N</span>

near Bay Parkway, along with several southern Brooklyn bus routes.
`,
      areas: "Flatlands, Marine Park edge, Midwood, Madison, Gravesend, Kings Highway commercial corridor, Bay Parkway area.",
      importance:
        "This section improves cross-borough local access in southern Brooklyn, connecting neighborhoods that often rely on indirect bus trips to reach subway corridors and commercial centers.",
        markers: [
 
  {
    title: "Kings Highway Commercial Corridor",
    type: "destination",
    coordinates: [-73.95769, 40.60901],
    description: "Major southern Brooklyn commercial corridor. Transfer to the B/Q trains and several bus routes."
  },
  {
    title: "McDonald Avenue",
    type: "destination",
    coordinates: [-73.97225, 40.60418],
    description: "Residential and local commercial area.  Transfer to the F train."
  },
  {
    title: "Bay Parkway",
    type: "terminal",
    coordinates: [-73.98062, 40.60507],
    description: "Western terminal area near Bay Parkway. Transfer to the N train and several bus routes."
  }
]
    }
  };

  const selected = sections[section];

  if (!selected) {
    console.error("No matching Brooklyn section found:", section);
    return;
  }

  highlightBrooklynSection(section);
  addSectionMarkers(selected.markers);

  map.flyTo({
    center: selected.center,
    zoom: selected.zoom,
    essential: true
  });

  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>${selected.title}</h2>

    <p><strong>Transfer points:</strong><br>
    ${selected.transfers}</p>

    <p><strong>Areas of interest:</strong><br>
    ${selected.areas}</p>

    <p><strong>Why this section matters:</strong><br>
    ${selected.importance}</p>

    <button class="back-button" id="backToBrooklyn">← Back to full Brooklyn line</button>
  `;

  document.getElementById("backToBrooklyn").addEventListener("click", () => {
    clearBrooklynHighlight();
    clearSectionMarkers();

    showBrooklynPanel();

    map.flyTo({
      center: [-73.93, 40.64],
      zoom: 11.8,
      essential: true
    });
  });
}
// Queens section panels
function showQueensSection(section) {
  const sections = {
    flushing: {
      title: "Flushing Section",
      center: [-73.83, 40.76],
      zoom: 13,
transfers: `
<span class="route-pill route-7">7</span>

and LIRR at Flushing–Main Street, with major Queens bus connections.
`,
      areas: "Downtown Flushing, Main Street retail corridor, residential districts, schools, parks, and civic destinations.",
      importance:
        "This section strengthens local access into one of Queens’ busiest transit and commercial hubs, improving short trips around Downtown Flushing and connections to regional transit.",
        markers: [
  {
    title: "Flushing–Main Street",
    type: "transfer",
    coordinates: [-73.8300, 40.7596],
    description: "Major transfer point for the 7 train, LIRR, and many Queens bus routes."
  },
  {
    title: "Queens Botanical Garden",
    type: "destination",
    coordinates: [-73.8262, 40.7516],
    description: "Major civic, cultural, and recreational destination near the Flushing corridor."
  }
]
    },

    kewGardens: {
      title: "Kew Gardens Section",
      center: [-73.82, 40.71],
      zoom: 12.5,
transfers: `
<span class="route-pill route-e">E</span>
<span class="route-pill route-f">F</span>

near Kew Gardens–Union Turnpike,

LIRR near Kew Gardens, and bus connections along Queens Boulevard.
`,
      areas: "Kew Gardens, Forest Hills edge, Queens Boulevard corridor, civic and institutional destinations.",
      importance:
        "This section helps bridge central Queens, giving riders a stronger surface connection between northern Queens and the Jamaica corridor without relying only on Manhattan-oriented subway trips.",
        markers: [
  {
    title: "Queens Boulevard / Kew Gardens",
    type: "transfer",
    coordinates: [-73.82008, 40.70864],
    description: "Important central Queens bus connection. Transfter to E/F trains",
  },
  {
    title: "Kew Gardens LIRR",
    type: "transfer",
    coordinates: [-73.8307, 40.7096],
    description: "LIRR connection supporting regional access between central Queens and Manhattan/Long Island."
  }
]
    },

    jamaica: {
      title: "Jamaica Section",
      center: [-73.76, 40.70],
      zoom: 12.5,
transfers: `
<span class="route-pill route-e">E</span>

<span class="route-pill route-j">J</span>
<span class="route-pill route-z">Z</span>

subway service, LIRR, AirTrain JFK, and the Jamaica bus hub.
`,
      areas: "Downtown Jamaica, Jamaica Avenue, York College area, commercial corridors, civic destinations, Belmont Park / UBS Arena area.",
      importance:
        "This section connects one of Queens’ largest transit hubs with eastern destinations, strengthening local access and supporting trips that are difficult to make by subway alone.",
        markers: [
  {
    title: "Jamaica Center–Parsons/Archer",
    type: "transfer",
    coordinates: [-73.8011, 40.7021],
    description: "Hub in Downtown Jamaica. Transfer to the E/J/Z trains, LIRR, and AirTrain JFK."
  },
  {
    title: "Belmont Park",
    type: "terminal",
    coordinates: [-73.7260, 40.7118],
    description: "Eastern terminal destination near Belmont Park and UBS Arena."
  }
]
    }
  };

  const selected = sections[section];

  if (!selected) {
    console.error("No matching Queens section found:", section);
    return;
  }

  highlightQueensSection(section);
  addSectionMarkers(selected.markers);

  map.flyTo({
    center: selected.center,
    zoom: selected.zoom,
    essential: true
  });

  infoPanel.classList.remove("hidden");

  infoPanelContent.innerHTML = `
    <h2>${selected.title}</h2>

    <p><strong>Transfer points:</strong><br>
    ${selected.transfers}</p>

    <p><strong>Areas of interest:</strong><br>
    ${selected.areas}</p>

    <p><strong>Why this section matters:</strong><br>
    ${selected.importance}</p>

    <button class="back-button" id="backToQueens">← Back to full Queens line</button>
  `;

  document.getElementById("backToQueens").addEventListener("click", () => {
    clearQueensHighlight();
    clearSectionMarkers();

    showQueensPanel();

    map.flyTo({
      center: [-73.82, 40.72],
      zoom: 11.4,
      essential: true
    });
  });
}




// Highlight selected Manhattan section
function highlightManhattanSection(sectionName) {
  const filter = ["==", ["get", "section"], sectionName];

  map.setFilter("manhattan-section-highlight-bg", filter);
  map.setFilter("manhattan-section-highlight-dash", filter);

  map.setPaintProperty("manhattan-section-highlight-bg", "line-opacity", 0.85);
  map.setPaintProperty("manhattan-section-highlight-dash", "line-opacity", 1);

  map.moveLayer("manhattan-section-highlight-bg");
  map.moveLayer("manhattan-section-highlight-dash");

  cancelAnimationFrame(antPathFrame);
  antPathFrame = requestAnimationFrame(animateManhattanAntPath);
}
// Clear Manhattan section highlight
function clearManhattanHighlight() {
  cancelAnimationFrame(antPathFrame);

  if (map.getLayer("manhattan-section-highlight-bg")) {
    map.setPaintProperty("manhattan-section-highlight-bg", "line-opacity", 0);
  }

  if (map.getLayer("manhattan-section-highlight-dash")) {
    map.setPaintProperty("manhattan-section-highlight-dash", "line-opacity", 0);
  }
}
// Highlight selected Bronx section
function highlightBronxSection(sectionName) {
  const filter = ["==", ["get", "section"], sectionName];

  map.setFilter("bronx-section-highlight-bg", filter);
  map.setFilter("bronx-section-highlight-dash", filter);

  map.setPaintProperty("bronx-section-highlight-bg", "line-opacity", 0.85);
  map.setPaintProperty("bronx-section-highlight-dash", "line-opacity", 1);

  map.moveLayer("bronx-section-highlight-bg");
  map.moveLayer("bronx-section-highlight-dash");

  cancelAnimationFrame(bronxAntPathFrame);
  bronxAntPathFrame = requestAnimationFrame(animateBronxAntPath);
}

// Clear Bronx section highlight
function clearBronxHighlight() {
  cancelAnimationFrame(bronxAntPathFrame);

  if (map.getLayer("bronx-section-highlight-bg")) {
    map.setPaintProperty("bronx-section-highlight-bg", "line-opacity", 0);
  }

  if (map.getLayer("bronx-section-highlight-dash")) {
    map.setPaintProperty("bronx-section-highlight-dash", "line-opacity", 0);
  }
}

// Highlight selected Brooklyn section
function highlightBrooklynSection(sectionName) {
  const filter = ["==", ["get", "section"], sectionName];

  map.setFilter("brooklyn-section-highlight-bg", filter);
  map.setFilter("brooklyn-section-highlight-dash", filter);

  map.setPaintProperty("brooklyn-section-highlight-bg", "line-opacity", 0.85);
  map.setPaintProperty("brooklyn-section-highlight-dash", "line-opacity", 1);

  map.moveLayer("brooklyn-section-highlight-bg");
  map.moveLayer("brooklyn-section-highlight-dash");

  cancelAnimationFrame(brooklynAntPathFrame);
  brooklynAntPathFrame = requestAnimationFrame(animateBrooklynAntPath);
}

// Clear Brooklyn section highlight
function clearBrooklynHighlight() {
  cancelAnimationFrame(brooklynAntPathFrame);

  if (map.getLayer("brooklyn-section-highlight-bg")) {
    map.setPaintProperty("brooklyn-section-highlight-bg", "line-opacity", 0);
  }

  if (map.getLayer("brooklyn-section-highlight-dash")) {
    map.setPaintProperty("brooklyn-section-highlight-dash", "line-opacity", 0);
  }
}
// Highlight selected Queens section
function highlightQueensSection(sectionName) {
  const filter = ["==", ["get", "section"], sectionName];

  map.setFilter("queens-section-highlight-bg", filter);
  map.setFilter("queens-section-highlight-dash", filter);

  map.setPaintProperty("queens-section-highlight-bg", "line-opacity", 0.85);
  map.setPaintProperty("queens-section-highlight-dash", "line-opacity", 1);

  map.moveLayer("queens-section-highlight-bg");
  map.moveLayer("queens-section-highlight-dash");

  cancelAnimationFrame(queensAntPathFrame);
  queensAntPathFrame = requestAnimationFrame(animateQueensAntPath);
}

// Clear Queens section highlight
function clearQueensHighlight() {
  cancelAnimationFrame(queensAntPathFrame);

  if (map.getLayer("queens-section-highlight-bg")) {
    map.setPaintProperty("queens-section-highlight-bg", "line-opacity", 0);
  }

  if (map.getLayer("queens-section-highlight-dash")) {
    map.setPaintProperty("queens-section-highlight-dash", "line-opacity", 0);
  }
}

// Active section markers
let activeSectionMarkers = [];

// Clear active section markers
function clearSectionMarkers() {
  activeSectionMarkers.forEach((marker) => marker.remove());
  activeSectionMarkers = [];
}

// Add markers for selected section
function addSectionMarkers(markers) {
  clearSectionMarkers();

  markers.forEach((markerData) => {
    const markerElement = document.createElement("div");
    markerElement.className = `section-marker ${markerData.type}`;

    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat(markerData.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 18 }).setHTML(`
          <h3>${markerData.title}</h3>
          <p>${markerData.description}</p>
        `)
      )
      .addTo(map);

    activeSectionMarkers.push(marker);
  });
}


// Load map layers
map.on("load", () => {
  // Add base MTA subway lines
  map.addSource("subway-lines", {
    type: "geojson",
    data: "data/subwaylines.geojson"
  });

  map.addLayer({
    id: "subway-lines-layer",
    type: "line",
    source: "subway-lines",
    paint: {
      "line-color": [
        "case",
        ["has", "color"],
        ["concat", "#", ["get", "color"]],
        "#888888"
      ],
      "line-width": 2.2,
      "line-opacity": 0.30
    }
  });
  // Manhattan tram source
  map.addSource("tram-manhattan", {
    type: "geojson",
    data: "data/tram_manhattan.geojson"
  });

  // Bronx tram source
  map.addSource("tram-bronx", {
    type: "geojson",
    data: "data/tram_bronx.geojson"
  });

  // Brooklyn tram source
  map.addSource("tram-brooklyn", {
    type: "geojson",
    data: "data/tram_brooklyn.geojson"
    
  });
  // Queens tram source
  map.addSource("tram-queens", {
  type: "geojson",
  data: "data/tram_queens.geojson"
});


  // Manhattan tram layer
  map.addLayer({
    id: "tram-manhattan-layer",
    type: "line",
    source: "tram-manhattan",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#ff4fa3",
      "line-width": 6,
      "line-opacity": 0.95
    }
  });

  // Bronx tram layer
  map.addLayer({
    id: "tram-bronx-layer",
    type: "line",
    source: "tram-bronx",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#2a9d8f",
      "line-width": 6,
      "line-opacity": 0.95
    }
  });

  // Brooklyn tram layer
  map.addLayer({
    id: "tram-brooklyn-layer",
    type: "line",
    source: "tram-brooklyn",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#457b9d",
      "line-width": 6,
      "line-opacity": 0.95
    }
  });
   // Queens tram layer
   map.addLayer({
    id: "tram-queens-layer",
    type: "line",
    source: "tram-queens",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#f4a261",
      "line-width": 6,
      "line-opacity": 0.95
    }
  });
// Manhattan section source
map.addSource("manhattan-sections", {
  type: "geojson",
  data: "data/tram_manhattan_sections.geojson"
});

// Manhattan section highlight background
map.addLayer({
  id: "manhattan-section-highlight-bg",
  type: "line",
  source: "manhattan-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#00e5ff",
    "line-width": 9,
    "line-opacity": 0
  }
});
// Manhattan section animated dashed highlight
map.addLayer({
  id: "manhattan-section-highlight-dash",
  type: "line",
  source: "manhattan-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#ffffff",
    "line-width": 5,
    "line-opacity": 0,
    "line-dasharray": [0, 4, 3]
  }
});


map.moveLayer("manhattan-section-highlight-bg");
map.moveLayer("manhattan-section-highlight-dash");

// Bronx section source
map.addSource("bronx-sections", {
  type: "geojson",
  data: "data/tram_bronx_sections.geojson"
});

// Bronx section highlight background
map.addLayer({
  id: "bronx-section-highlight-bg",
  type: "line",
  source: "bronx-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#00e5ff",
    "line-width": 9,
    "line-opacity": 0
  }
});

// Bronx section animated dashed highlight
map.addLayer({
  id: "bronx-section-highlight-dash",
  type: "line",
  source: "bronx-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#ffffff",
    "line-width": 5,
    "line-opacity": 0,
    "line-dasharray": [0, 4, 3]
  }
});

// Move Bronx highlight layers above route lines
map.moveLayer("bronx-section-highlight-bg");
map.moveLayer("bronx-section-highlight-dash");

// Brooklyn section source
map.addSource("brooklyn-sections", {
  type: "geojson",
  data: "data/tram_brooklyn_sections.geojson"
});

// Brooklyn section highlight background
map.addLayer({
  id: "brooklyn-section-highlight-bg",
  type: "line",
  source: "brooklyn-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#00e5ff",
    "line-width": 9,
    "line-opacity": 0
  }
});

// Brooklyn section animated dashed highlight
map.addLayer({
  id: "brooklyn-section-highlight-dash",
  type: "line",
  source: "brooklyn-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#ffffff",
    "line-width": 5,
    "line-opacity": 0,
    "line-dasharray": [0, 4, 3]
  }
});

// Move Brooklyn highlight layers above route lines
map.moveLayer("brooklyn-section-highlight-bg");
map.moveLayer("brooklyn-section-highlight-dash");

// Queens section source
map.addSource("queens-sections", {
  type: "geojson",
  data: "data/tram_queens_sections.geojson"
});

// Queens section highlight background
map.addLayer({
  id: "queens-section-highlight-bg",
  type: "line",
  source: "queens-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#00e5ff",
    "line-width": 9,
    "line-opacity": 0
  }
});

// Queens section animated dashed highlight
map.addLayer({
  id: "queens-section-highlight-dash",
  type: "line",
  source: "queens-sections",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#ffffff",
    "line-width": 5,
    "line-opacity": 0,
    "line-dasharray": [0, 4, 3]
  }
});

// Move Queens highlight layers above route lines
map.moveLayer("queens-section-highlight-bg");
map.moveLayer("queens-section-highlight-dash");

    // Change cursor on tram hover
  const tramLayers = [
    "tram-manhattan-layer",
    "tram-bronx-layer",
    "tram-brooklyn-layer",
    "tram-queens-layer"
  ];

  tramLayers.forEach((layer) => {
    map.on("mouseenter", layer, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", layer, () => {
      map.getCanvas().style.cursor = "";
    });
  });

});

// Animation for Manhattan section highlight
let antPathFrame;
let antPathStep = 0;

// Animation for Bronx section highlight
let bronxAntPathFrame;
let bronxAntPathStep = 0;

// Animation for Brooklyn section highlight
let brooklynAntPathFrame;
let brooklynAntPathStep = 0;

// Animation for Queens section highlight
let queensAntPathFrame;
let queensAntPathStep = 0;

const antPathSequence = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
  [0, 0.5, 3, 3.5],
  [0, 1, 3, 3],
  [0, 1.5, 3, 2.5],
  [0, 2, 3, 2],
  [0, 2.5, 3, 1.5],
  [0, 3, 3, 1],
  [0, 3.5, 3, 0.5]
];
// Animate Manhattan section highlight
function animateManhattanAntPath(timestamp) {
  const newStep = parseInt((timestamp / 50) % antPathSequence.length);

  if (newStep !== antPathStep) {
    map.setPaintProperty(
      "manhattan-section-highlight-dash",
      "line-dasharray",
      antPathSequence[newStep]
    );

    antPathStep = newStep;
  }

  antPathFrame = requestAnimationFrame(animateManhattanAntPath);
}

// Animate Bronx section highlight
function animateBronxAntPath(timestamp) {
  const newStep = parseInt((timestamp / 50) % antPathSequence.length);

  if (newStep !== bronxAntPathStep) {
    map.setPaintProperty(
      "bronx-section-highlight-dash",
      "line-dasharray",
      antPathSequence[newStep]
    );

    bronxAntPathStep = newStep;
  }

  bronxAntPathFrame = requestAnimationFrame(animateBronxAntPath);
}
  // Animate Brooklyn section highlight
function animateBrooklynAntPath(timestamp) {
  const newStep = parseInt((timestamp / 50) % antPathSequence.length);

  if (newStep !== brooklynAntPathStep) {
    map.setPaintProperty(
      "brooklyn-section-highlight-dash",
      "line-dasharray",
      antPathSequence[newStep]
    );

    brooklynAntPathStep = newStep;
  }

  brooklynAntPathFrame = requestAnimationFrame(animateBrooklynAntPath);
}
// Animate Queens section highlight
function animateQueensAntPath(timestamp) {
  const newStep = parseInt((timestamp / 50) % antPathSequence.length);

  if (newStep !== queensAntPathStep) {
    map.setPaintProperty(
      "queens-section-highlight-dash",
      "line-dasharray",
      antPathSequence[newStep]
    );

    queensAntPathStep = newStep;
  }

  queensAntPathFrame = requestAnimationFrame(animateQueensAntPath);
}