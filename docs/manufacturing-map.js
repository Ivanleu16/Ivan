const manufacturingMapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 700,
  "height": 600,
  "background": "#fcfcfb",
  "projection": { "type": "mercator" },
  "config": {
    "view": { "stroke": null },
    "legend": { "labelFontSize": 11, "titleFontSize": 12, "labelColor": "#3d3d3a", "titleColor": "#3d3d3a" }
  },
  "layer": [
    {
      "data": {
        "url": "data/states.topojson",
        "format": { "type": "topojson", "feature": "STE_2026_AUST_GDA2020" }
      },
      "transform": [
        { "filter": "datum.properties.STE_CODE26 !== '9' && datum.properties.STE_CODE26 !== 'Z'" }
      ],
      "mark": { "type": "geoshape", "fill": "#e1e0d9", "stroke": "#fcfcfb", "strokeWidth": 1 }
    },
    {
      "data": { "url": "data/manufacturing_jobs_by_state_map.csv" },
      "transform": [{ "filter": "datum.period == 1994" }],
      "mark": {
        "type": "circle",
        "fillOpacity": 0,
        "stroke": "#5f5e58",
        "strokeWidth": 1.2,
        "strokeDash": [3, 3]
      },
      "encoding": {
        "longitude": { "field": "longitude", "type": "quantitative" },
        "latitude": { "field": "latitude", "type": "quantitative" },
        "size": {
          "field": "manufacturing_jobs_thousands",
          "type": "quantitative",
          "scale": { "domain": [0, 400], "range": [0, 4500] },
          "legend": null
        }
      }
    },
    {
      "data": { "url": "data/manufacturing_jobs_by_state_map.csv" },
      "transform": [{ "filter": "datum.period == 2026" }],
      "mark": { "type": "circle", "opacity": 0.9, "stroke": "#fcfcfb", "strokeWidth": 1.5 },
      "encoding": {
        "longitude": { "field": "longitude", "type": "quantitative" },
        "latitude": { "field": "latitude", "type": "quantitative" },
        "size": {
          "field": "manufacturing_jobs_thousands",
          "type": "quantitative",
          "scale": { "domain": [0, 400], "range": [0, 4500] },
          "legend": {
            "title": "Manufacturing jobs, 2026 (thousands)",
            "orient": "bottom-right",
            "values": [50, 150, 250],
            "symbolFillColor": "#898781",
            "symbolStrokeColor": "#fcfcfb"
          }
        },
        "color": {
          "field": "manufacturing_share_pct",
          "type": "quantitative",
          "scale": { "domain": [0, 8], "range": ["#cde2fb", "#184f95"] },
          "legend": {
            "title": "Share of state jobs (%)",
            "orient": "bottom-left",
            "direction": "horizontal",
            "gradientLength": 160
          }
        },
        "tooltip": [
          { "field": "state_name", "title": "State" },
          { "field": "manufacturing_jobs_thousands", "title": "Manufacturing jobs (thousands)" },
          { "field": "manufacturing_share_pct", "title": "Share of state jobs (%)" }
        ]
      }
    },
    {
      "data": { "url": "data/manufacturing_jobs_by_state_map.csv" },
      "transform": [{ "filter": "datum.period == 2026 && datum.manufacturing_jobs_thousands >= 60" }],
      "mark": { "type": "text", "fontWeight": "bold", "fontSize": 12, "color": "#ffffff" },
      "encoding": {
        "longitude": { "field": "longitude", "type": "quantitative" },
        "latitude": { "field": "latitude", "type": "quantitative" },
        "text": { "field": "state_abbr" }
      }
    },
    {
      "data": { "url": "data/manufacturing_jobs_by_state_map.csv" },
      "transform": [{ "filter": "datum.period == 2026 && datum.manufacturing_jobs_thousands < 60" }],
      "mark": {
        "type": "text",
        "fontWeight": "bold",
        "fontSize": 12,
        "color": "#1a1a18",
        "align": "left",
        "dx": 14
      },
      "encoding": {
        "longitude": { "field": "longitude", "type": "quantitative" },
        "latitude": { "field": "latitude", "type": "quantitative" },
        "text": { "field": "state_abbr" }
      }
    }
  ]
};

vegaEmbed("#manufacturing-map", manufacturingMapSpec, { "actions": false });