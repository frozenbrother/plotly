// initalization
function init(){
    buildPlot()
}

// create a function to save the changes to the options that have been applied
function options() {

    // build the plot with applied changes
    buildPlot();
}

// create a function to build a new plot
function buildPlot(){

    d3.json("samples.json").then((data) =>{
        // list the the id values
        var idvalues = data.names;

        // Dropdown to store the values of all the id using the below function
        idvalues.forEach(id => d3.select('#selDataset').append('option').text(id).property("value", id));

        // Using D3 select the selected ID to to extract the details to work with
        var selectedid = d3.selectAll("#selDataset").node().value;

        // filter the data based on the current ID that's been selected
        filterid = data.samples.filter(entry => entry.id == selectedid);

        // create a trace for horizontal bar chart
        var trace1 = {
            x: filterid[0].sample_values.slice(0,10).reverse(),
            y: filterid[0].otu_ids.slice(0, 10).reverse().map(int => "OTU " + int.toString()),
            text: filterid[0].otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation: 'h'
        };

        // data
        var dataPlot = [trace1];

        // layout
        var layout = {
        title: '10 OTU samples',
        margin: {
            l: 75,
            r: 100,
            t: 60,
            b: 60
        }
    };

         //create a new bar chart with plotly
         Plotly.newPlot("bar", dataPlot, layout);

         // demographics panel
         filteredMeta = data.metadata.filter(entry => entry.id == selectedid)

         // create an object for the demographics
            var demographics = {
            'id ': filteredMeta[0].id,
            'ethnicity ': filteredMeta[0].ethnicity,
            'gender: ': filteredMeta[0].gender,
            'age: ': filteredMeta[0].age,
            'location ': filteredMeta[0].location,
            'bbtytpe: ': filteredMeta[0].bbtype,
            'wfreq ': filteredMeta[0].wfreq

        }

        // use id to append lookup the key value pair in demographics
        panelbody = d3.select("#sample-metadata")

        // remove the current lookup pair from demographics into demographics
        panelbody.html("")


        Object.entries(demographics).forEach(([key, value]) => {
            panelbody.append('p').attr('style', 'font-weight: bold').text(key + value)
        });

        // create trace data for the bubble chart
        var trace2 ={
            x : filterid[0].otu_ids,
            y : filterid[0].sample_values,
            text : filterid[0].otu_labels,
            mode : 'markers',
            marker: { 
                color : filterid[0].otu_ids,
                size : filterid[0].sample_values
            }
        }

        var data2 = [trace2]

        // layout & legend for the bubble chart
        var layout2 = {
            title : 'marker size',
            showlegend : true,
        }
        
        // plot the data using plotly
        Plotly.newPlot('bubble', data2, layout2)
        console.log(filterid)
        gauge()
    });
};
// initalize into the main page
init();