const FOCUS_SCALE = {
  "domain": ["Manufacturing", "Mining", "Health care and social assistance", "Agriculture, forestry and fishing", "Other"],
  "range": ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#898781"]
};

const dumbbellSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 600,
  "height": 520,
  "title": {
    "text": "Where Australia's jobs moved",
    "subtitle": "Each industry's share of all jobs. Grey dot is 1994, coloured dot is 2026.",
    "anchor": "start"
  },
  "data": { "url": "data/abs_filled_jobs_by_industry_seasonally_adjusted.csv" },
  "transform": [
    { "joinaggregate": [{ "op": "sum", "field": "jobs_thousands", "as": "total_jobs" }], "groupby": ["quarter"] },
    { "calculate": "datum.jobs_thousands / datum.total_jobs * 100", "as": "share" },
    { "filter": "datum.quarter === '1994-Q3' || datum.quarter === '2026-Q2'" },
    { "calculate": "datum.quarter === '1994-Q3' ? '1994' : '2026'", "as": "year" },
    { "calculate": "datum.quarter === '2026-Q2' ? datum.share : -datum.share", "as": "signed_share" },
    { "joinaggregate": [{ "op": "sum", "field": "signed_share", "as": "change" }], "groupby": ["industry"] },
    {
      "calculate": "indexof(['Manufacturing', 'Mining', 'Health care and social assistance', 'Agriculture, forestry and fishing'], datum.industry) >= 0 ? datum.industry : 'Other'",
      "as": "focus"
    }
  ],
  "encoding": {
    "y": {
      "field": "industry",
      "type": "nominal",
      "title": null,
      "sort": { "field": "change", "op": "max", "order": "descending" },
      "axis": { "labelLimit": 320 }
    },
    "x": { "field": "share", "type": "quantitative", "title": "Share of all jobs (%)" }
  },
  "layer": [
    {
      "mark": { "type": "line", "strokeWidth": 2 },
      "encoding": {
        "detail": { "field": "industry", "type": "nominal" },
        "color": { "field": "focus", "type": "nominal", "scale": FOCUS_SCALE, "legend": null }
      }
    },
    {
      "transform": [{ "filter": "datum.year === '1994'" }],
      "mark": { "type": "circle", "size": 110, "opacity": 1, "color": "#b3b2ab" },
      "encoding": {
        "tooltip": [
          { "field": "industry", "type": "nominal", "title": "Industry" },
          { "field": "year", "type": "nominal", "title": "Year" },
          { "field": "share", "type": "quantitative", "title": "Share of all jobs (%)", "format": ".1f" }
        ]
      }
    },
    {
      "transform": [{ "filter": "datum.year === '2026'" }],
      "mark": { "type": "circle", "size": 110, "opacity": 1 },
      "encoding": {
        "color": { "field": "focus", "type": "nominal", "scale": FOCUS_SCALE, "legend": null },
        "tooltip": [
          { "field": "industry", "type": "nominal", "title": "Industry" },
          { "field": "year", "type": "nominal", "title": "Year" },
          { "field": "share", "type": "quantitative", "title": "Share of all jobs (%)", "format": ".1f" }
        ]
      }
    }
  ]
};

vegaEmbed("#share-chart", dumbbellSpec);