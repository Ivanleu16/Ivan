const manufacturingSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 560,
  "height": 320,
  "title": {
    "text": "Manufacturers make more with fewer hours",
    "subtitle": [
      "Australian manufacturing, index with 1994-95 = 100.",
      "Source: ABS multifactor productivity estimates."
    ]
  },
  "data": { "url": "data/abs_industry_productivity.csv" },
  "transform": [
    { "filter": "datum.industry === 'Manufacturing' && datum.measure !== 'Multifactor productivity' && datum.year >= '1994-95'" },
    {
      "window": [{ "op": "first_value", "field": "index_2023_24_eq_100", "as": "base" }],
      "groupby": ["measure"],
      "sort": [{ "field": "year", "order": "ascending" }],
      "frame": [null, null]
    },
    { "calculate": "datum.index_2023_24_eq_100 / datum.base * 100", "as": "indexed" }
  ],
  "encoding": {
    "x": {
      "field": "year", "type": "ordinal", "title": null,
      "axis": { "values": ["1994-95", "2004-05", "2014-15", "2024-25"], "labelAngle": 0 }
    },
    "y": {
      "field": "indexed", "type": "quantitative",
      "scale": { "zero": false },
      "title": "Index (1994-95 = 100)"
    },
    "color": {
      "field": "measure", "type": "nominal",
      "scale": {
        "domain": ["Labour productivity", "Gross value added (output)", "Labour input (hours)"],
        "range": ["#2a78d6", "#184f95", "#898781"]
      },
      "legend": { "title": null, "orient": "top" }
    }
  },
  "layer": [
    { "mark": { "type": "line", "strokeWidth": 2 } },
    {
      "mark": { "type": "point", "filled": true, "size": 40 },
      "encoding": {
        "tooltip": [
          { "field": "year", "title": "Year" },
          { "field": "measure", "title": "Measure" },
          { "field": "indexed", "title": "Index", "format": ".1f" }
        ]
      }
    }
  ]
};

vegaEmbed("#manufacturing-chart", manufacturingSpec);