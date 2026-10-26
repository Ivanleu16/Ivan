const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 700,
  "height": 400,
  "padding": { "right": 230, "left": 5, "top": 5, "bottom": 5 },
  "data": { "url": "data/labour_four_industries.csv" },
  "transform": [
    { "filter": "datum.measure === 'filled_jobs' && datum.industry !== 'Total all industries'" },
    {
      "window": [{ "op": "first_value", "field": "value", "as": "base" }],
      "groupby": ["industry"],
      "sort": [{ "field": "quarter_end", "order": "ascending" }]
    },
    { "calculate": "datum.value / datum.base * 100", "as": "index" }
  ],
  "layer": [
    {
      "mark": { "type": "rule", "color": "#c3c2b7" },
      "encoding": { "y": { "datum": 100 } }
    },
    {
      "mark": { "type": "line", "strokeWidth": 2, "strokeJoin": "round", "strokeCap": "round" },
      "encoding": {
        "x": { "field": "quarter_end", "type": "temporal", "axis": { "title": null, "format": "%Y" } },
        "y": { "field": "index", "type": "quantitative", "title": "Jobs (Sep 1994 = 100)" },
        "color": {
          "field": "industry",
          "type": "nominal",
          "scale": {
            "domain": ["Manufacturing", "Mining", "Health care and social assistance", "Agriculture, forestry and fishing"],
            "range": ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"]
          },
          "legend": { "title": null, "orient": "top" }
        }
      }
    },
    {
      "mark": { "type": "point", "opacity": 0, "size": 200 },
      "encoding": {
        "x": { "field": "quarter_end", "type": "temporal" },
        "y": { "field": "index", "type": "quantitative" },
        "tooltip": [
          { "field": "industry", "type": "nominal", "title": "Industry" },
          { "field": "quarter_end", "type": "temporal", "title": "Quarter ending", "format": "%b %Y" },
          { "field": "index", "type": "quantitative", "title": "Index (Sep 1994 = 100)", "format": ".0f" },
          { "field": "value", "type": "quantitative", "title": "Jobs ('000)", "format": ",.0f" }
        ]
      }
    },
    {
      "transform": [
        {
          "window": [{ "op": "row_number", "as": "rank" }],
          "groupby": ["industry"],
          "sort": [{ "field": "quarter_end", "order": "descending" }]
        },
        { "filter": "datum.rank === 1" },
        {
          "calculate": "datum.industry === 'Agriculture, forestry and fishing' ? datum.index + 7 : datum.industry === 'Manufacturing' ? datum.index - 7 : datum.index",
          "as": "labelY"
        }
      ],
      "mark": { "type": "text", "align": "left", "dx": 8, "fontSize": 13, "fontWeight": 600 },
      "encoding": {
        "x": { "field": "quarter_end", "type": "temporal" },
        "y": { "field": "labelY", "type": "quantitative" },
        "text": { "field": "industry", "type": "nominal" }
      }
    }
  ]
};

vegaEmbed("#hook-chart", spec);

const INDUSTRIES = [
  "Manufacturing",
  "Mining",
  "Health care and social assistance",
  "Agriculture, forestry and fishing"
];

function monthYear(text) {
  return new Date(text).toLocaleDateString("en-AU", { month: "short", year: "numeric", timeZone: "UTC" });
}

function addRow(parent, cellType, values) {
  const tr = document.createElement("tr");
  values.forEach(value => {
    const cell = document.createElement(cellType);
    cell.textContent = value;
    tr.appendChild(cell);
  });
  parent.appendChild(tr);
}

fetch("data/labour_four_industries.csv")
  .then(response => response.text())
  .then(text => {
    const rows = vega.read(text, { type: "csv", parse: { value: "number" } })
      .filter(d => d.measure === "filled_jobs");

    const table = document.createElement("table");
    const head = document.createElement("thead");
    const body = document.createElement("tbody");

    INDUSTRIES.forEach((industry, i) => {
      const sub = rows
        .filter(d => d.industry === industry)
        .sort((a, b) => (a.quarter_end < b.quarter_end ? -1 : 1));
      const first = sub[0];
      const last = sub[sub.length - 1];
      const change = (last.value / first.value - 1) * 100;

      if (i === 0) {
        addRow(head, "th", [
          "Industry",
          "Jobs ('000), " + monthYear(first.quarter_end),
          "Jobs ('000), " + monthYear(last.quarter_end),
          "Change"
        ]);
      }
      addRow(body, "td", [
        industry,
        first.value.toLocaleString("en-AU", { maximumFractionDigits: 0 }),
        last.value.toLocaleString("en-AU", { maximumFractionDigits: 0 }),
        (change >= 0 ? "+" : "−") + Math.abs(change).toFixed(0) + "%"
      ]);
    });

    table.appendChild(head);
    table.appendChild(body);
    document.getElementById("hook-table").appendChild(table);
  });