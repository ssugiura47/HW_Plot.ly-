function top10dropdown(){
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) => {
        var sampleValues = data["samples"][0]["sample_values"]
        var otu_ids = "OTU " + data["samples"][0]["otu_ids"]
        var otu_labels = data["samples"][0]["otu_labels"]
    
        var topValues = sampleValues.sort((a, b) => b - a);
        var topTen  = topValues.slice(0,10);

    dropdown.append("option")
        .text(topTen)
        .property("value", topTen);

    var data = {
        y: otu_ids,
        x: topTen,
        type: "bar",
        text: otu_labels
    }
    var layout = {
        title: "Top 10 OTUs"
    }
    Plotly.newPlot("bar", [data], layout)

    });
};
 
d3.json("data/samples.json").then((data) => {
    var sampleValues = data["samples"][0]["sample_values"]
    var otu_ids = data["samples"][0]["otu_ids"]
    var otu_labels = data["samples"][0]["otu_labels"]
    
    var bubbleData = {
        x: otu_ids,
        y: sampleValues,
        text: otu_labels,
        mode: `markers`,
        marker: {
          size: sampleValues, 
          color: otu_ids
        }
    };

    var bubbleLayout = {
        xaxis: {title: "OTU ID"}, 
        title: "Belly Button Bacteria"
      };
    
    Plotly.newPlot('bubble', [bubbleData], bubbleLayout);
});

top10dropdown();