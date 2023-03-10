import "leaflet-arrowheads";
import "@elfalem/leaflet-curve";

var map = L.map("leafletMapid").setView([46.05, 11.05], 5);

var baselayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",
  {}
).addTo(map);

//quadratic bezier curve
var pathOne = L.curve(
  [
    "M",
    [50.14874640066278, 14.106445312500002],
    "Q",
    [51.67255514839676, 16.303710937500004],
    [50.14874640066278, 18.676757812500004],
    "T",
    [49.866316729538674, 25.0927734375]
  ],
  { animate: 3000 }
).addTo(map);

//cubic bezier curve (and straight lines)
var pathTwo = L.curve(
  [
    "M",
    [50.54136296522163, 28.520507812500004],
    "C",
    [52.214338608258224, 28.564453125000004],
    [48.45835188280866, 33.57421875000001],
    [50.680797145321655, 33.83789062500001],
    "V",
    [48.40003249610685],
    "L",
    [47.45839225859763, 31.201171875],
    [48.40003249610685, 28.564453125000004],
    "Z",
    "M",
    [49.55372551347579, 29.465332031250004],
    "V",
    [48.7822260446217],
    "H",
    [33.00292968750001],
    "V",
    [49.55372551347579],
    "Z"
  ],
  { color: "red", fill: true }
).addTo(map);

var pathThree = L.curve(
  [
    "M",
    [49.35375571830993, 6.240234375],
    "Q",
    [49.38237278700955, 9.843750000000002],
    [47.754097979680026, 9.360351562500002],
    [46.95026224218562, 6.635742187500001],
    [45.67548217560647, 8.437500000000002],
    [44.5278427984555, 5.5810546875],
    [45.85941212790755, 3.0761718750000004],
    [47.517200697839414, 4.218750000000001],
    [49.009050809382074, 3.7353515625000004],
    [48.45835188280866, 5.800781250000001],
    [48.8936153614802, 5.493164062500001],
    "Z"
  ],
  { fill: true, color: "orange" }
).addTo(map);

pathThree.on("click", function (e) {
  console.log("path three clicked");
});

var pathFour = L.curve(
  [
    "M",
    [46.86019101567027, -29.047851562500004],
    "Q",
    [50.48547354578499, -23.818359375000004],
    [46.70973594407157, -19.907226562500004],
    "T",
    [46.6795944656402, -11.0302734375]
  ],
  { dashArray: "5", animate: { duration: 3000, iterations: Infinity } }
).addTo(map);

const latlngs = pathThree.trace([
  0,
  0.1,
  0.2,
  0.3,
  0.4,
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1
]);

let arrowheads;

const drawArrowheads = () => {
  if (arrowheads) {
    arrowheads.remove();
  }

  const ghost = L.polyline(latlngs)
    .arrowheads({ color: "orange", size: "15000m" })
    .addTo(map);
  arrowheads = ghost.getArrowheads();
  ghost.remove();
  arrowheads.addTo(map);
};

drawArrowheads();

map.on("moveend", drawArrowheads);
