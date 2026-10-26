const agricultureSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 520,
  "height": 380,
  "title": {
    "text": "Farms produce far more with fewer hours",
    "subtitle": [
      "Australian agriculture, forestry and fishing, three-year averages, index with 1994-95 = 100.",
      "Averaged to smooth out drought and good seasons. Source: ABS multifactor productivity estimates."
    ]
  },
  "data": { "url": "data/abs_industry_productivity.csv" },
  "transform": [
    { "filter": "datum.industry === 'Agriculture, forestry and fishing' && (datum.measure === 'Gross value added (output)' || datum.measure === 'Labour input (hours)')" },
    { "pivot": "measure", "value": "index_2023_24_eq_100", "groupby": ["year"] },
    { "calculate": "datum['Labour input (hours)']", "as": "hours" },
    { "calculate": "datum['Gross value added (output)']", "as": "output" },
    {
      "window": [
        { "op": "mean", "field": "hours", "as": "hours_avg" },
        { "op": "mean", "field": "output", "as": "output_avg" }
      ],
      "sort": [{ "field": "year", "order": "ascending" }],
      "frame": [-2, 0]
    },
    { "filter": "datum.year >= '1994-95'" },
    {
      "window": [
        { "op": "first_value", "field": "hours_avg", "as": "hours0" },
        { "op": "first_value", "field": "output_avg", "as": "output0" }
      ],
      "sort": [{ "field": "year", "order": "ascending" }],
      "frame": [null, null]
    },
    { "calculate": "datum.hours_avg / datum.hours0 * 100", "as": "hours_index" },
    { "calculate": "datum.output_avg / datum.output0 * 100", "as": "output_index" }
  ],
  "encoding": {
    "x": { "field": "hours_index", "type": "quantitative", "scale": { "zero": false }, "title": "Hours worked (index)" },
    "y": { "field": "output_index", "type": "quantitative", "scale": { "zero": false }, "title": "Output (index)" },
    "order": { "field": "year", "type": "ordinal" }
  },
  "layer": [
    { "mark": { "type": "line", "color": "#eda100", "strokeWidth": 2, "strokeJoin": "round", "strokeCap": "round" } },
    {
      "mark": { "type": "point", "filled": true, "color": "#eda100", "size": 45 },
      "encoding": {
        "tooltip": [
          { "field": "year", "title": "Year" },
          { "field": "hours_index", "title": "Hours index", "format": ".1f" },
          { "field": "output_index", "title": "Output index", "format": ".1f" }
        ]
      }
    },
    {
      "transform": [{ "filter": "datum.year === '1994-95' || datum.year === '2004-05' || datum.year === '2014-15' || datum.year === '2024-25'" }],
      "mark": { "type": "text", "dx": 10, "dy": -10, "align": "left", "fontSize": 12 },
      "encoding": { "text": { "field": "year" } }
    }
  ]
};

vegaEmbed("#agriculture-chart", agricultureSpec);