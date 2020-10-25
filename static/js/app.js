
function unpack(rows, index){
    return rows.map(row => row[index])
};

function init(){
    d3.json("data/samples.json").then((data) => {
        var sampleValues = data["samples"][0]["sample_values"]
        var otu_ids = data["samples"][0]["otu_ids"]
        var otu_labels = data["samples"][0]["otu_labels"]

        var topTenValues = sampleValues.slice(0,10);
        var topTenIDs = otu_ids.slice(0,10);
        console.log(topTenIDs)
        var toptenOTUIDs = topTenIDs.map(d => `OTU ${d}`);
        var topTenLabels = otu_labels.slice(0,10);

        var data = {
            x: topTenValues,
            y: toptenOTUIDs,
            type: "bar",
            text: topTenLabels,
            orientation: "h"
            };

        var layout = {
            title: "Top 10 OTUs",
            yaxis: topTenIDs
            };

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
     

    d3.json("data/samples.json").then((data) => {
        var subjectID = data["metadata"][0]["id"]
        var subjectEth = data["metadata"][0]["ethnicity"]
        var subjectGen = data["metadata"][0]["gender"]
        var subjectAge = data["metadata"][0]["age"]
        var subjectLoc = data["metadata"][0]["location"]
        var subjectBB = data["metadata"][0]["bbtype"]
        var subjectWF = data["metadata"][0]["wfreq"]

        d3.select("#sample-metadata").append("div")
            .text(`ID: ${subjectID}`)
            .append("div").text(`Ethnicity: ${subjectEth}`)
            .append("div").text(`Gender: ${subjectGen}`)
            .append("div").text(`Age: ${subjectAge}`)
            .append("div").text(`Location: ${subjectLoc}`)
            .append("div").text(`BBType: ${subjectBB}`)
            .append("div").text(`WFrequence: ${subjectWF}`)

    });
};

function getData(){

    d3.json("data/samples.json").then((data) => {
    
    var allsubjects = data.metadata
    var subjectIDs = allsubjects.map(d => d.id)
    
    var dropdown = d3.select("#selDataset");

    for (var i = 0; i < 153; i++){
        var option = dropdown.append("option");
        option.append("value").text(subjectIDs[i])
        }     

    });
};

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", updatePlotly);

function optionChanged(id) {
    getData(id);
    updatePlotly(id) ;
};

// This function is called when a dropdown menu item is selected
function updatePlotly(id) {
    // Use D3 to select the dropdown menu
    getData();

    d3.json("data/samples.json").then((data) => {
    var allsubjects = data.metadata;
    var result = allsubjects.filter(meta => meta.id.toString() == id)[0];
    console.log(result)
    var demoInfo = d3.select("#sample-metadata");
    demoInfo.html("");

    d3.json("data/samples.json").then((data) => {
        var resultSubjectID = allsubjects.filter(meta => meta.id.toString() == id)[0]["id"]
        var resultSubjectEth = allsubjects.filter(meta => meta.id.toString() == id)[0]["ethnicity"]
        var resultSubjectGen = allsubjects.filter(meta => meta.id.toString() == id)[0]["gender"]
        var resultSubjectAge = allsubjects.filter(meta => meta.id.toString() == id)[0]["age"]
        var resultSubjectLoc = allsubjects.filter(meta => meta.id.toString() == id)[0]["location"]
        var resultSubjectBB = allsubjects.filter(meta => meta.id.toString() == id)[0]["bbtype"]
        var resultSubjectWF = allsubjects.filter(meta => meta.id.toString() == id)[0]["wfreq"]

        d3.select("#sample-metadata").append("div")
            .text(`ID: ${resultSubjectID}`)
            .append("div").text(`Ethnicity: ${resultSubjectEth}`)
            .append("div").text(`Gender: ${resultSubjectGen}`)
            .append("div").text(`Age: ${resultSubjectAge}`)
            .append("div").text(`Location: ${resultSubjectLoc}`)
            .append("div").text(`BBType: ${resultSubjectBB}`)
            .append("div").text(`WFrequence: ${resultSubjectWF}`)

        var allsubjects_samples = data.samples;
        var result_data = allsubjects_samples.filter(samp => samp.id.toString() == id)[0];
        console.log(result_data)

        var resultSampleValues = result_data.sample_values
        var result_otu_ids = result_data.otu_ids
        var result_otu_labels = result_data.otu_labels

        console.log(resultSampleValues)  
        console.log(result_otu_ids)
        console.log(result_otu_labels)

        var result_topTenValues = resultSampleValues.slice(0,10);
        var result_topTenIDs = result_otu_ids.slice(0,10);
        var result_topOTUIDs = result_topTenIDs.map(d => `OTU ${d}`);
        var result_topTenLabels = result_otu_labels.slice(0,10);

        var result_data = {
            x: result_topTenValues,
            y: result_topOTUIDs,
            type: "bar",
            text: result_topTenLabels
            };

        var layout = {
            title: "Top 10 OTUs",
            yaxis: result_topOTUIDs
            };
     

        Plotly.restyle("bar", "y", [result_topOTUIDs]);
        Plotly.restyle("bar", "x", [result_topTenValues]);
    })

  });

};



getData()
init()