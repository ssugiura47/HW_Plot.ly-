
function unpack(rows, index){
    return rows.map(row => row[index])
};

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

function getData(){

    d3.json("data/samples.json").then((data) => {
        var allsubjects = data.metadata
        console.log(allsubjects)

    var subjectIDs = allsubjects.map(d => d.id)
    console.log(subjectIDs)
    
    var dropdown = d3.select("#selDataset");
    // var dataset = dropdown.node().value;
    // var chart = d3.selectAll("#bar").node();

    for (var i = 0; i < 153; i++){
        var option = dropdown.append("option");
        option.append("value").text(subjectIDs[i])
        }  

    });
};

function init(){
    d3.json("data/samples.json").then((data) => {
        var sampleValues = data["samples"][0]["sample_values"]
        var otu_ids = "OTU " + data["samples"][0]["otu_ids"]
        var otu_labels = data["samples"][0]["otu_labels"]

        var topTenValues = sampleValues.slice(0,10);
        var topTenIDs = otu_ids.slice(0,10);
        var topTenLabels = otu_labels.slice(0,10);

        var data = {
                y: topTenIDs,
                x: topTenValues,
                type: "bar",
                text: topTenLabels
                }
                var layout = {
                title: "Top 10 OTUs"
                }
            Plotly.newPlot("bar", [data], layout)
        });
        
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
};

// function table(){

//     d3.json("data/samples.json").then((data) => {
//         var sampleValues = data["samples"][0]["sample_values"]
//         var otu_ids = "OTU " + data["samples"][0]["otu_ids"]
//         var otu_labels = data["samples"][0]["otu_labels"]
    
//         var topTenValues = sampleValues.slice(0,10);
//         var topTenIDs = otu_ids.slice(0,10);
//         var topTenLabels = otu_labels.slice(0,10);
    
//     var data = {
//     y: otu_ids,
//     x: topTen,
//     type: "bar",
//     text: otu_labels
// }
//     var layout = {
//     title: "Top 10 OTUs"
// }
//     Plotly.newPlot("bar", [data], layout)
 
// 
// });

// top10dropdown();

getData()
init()