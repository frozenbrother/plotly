// initalisation
function init(){
        buildPlot()
}

// create a function to save the changes to the options that have been applied
function optionsApplied() {

    // build the plot with applied changes

}

// create a function to build a new plot
function buildPlot(){

    d3.json("samples.json").then((data) =>{
        // list the the id values
        var idvalues = data.names;

        // Dropdown to store the values of all the id using the below function
        idvalues.forEach(id => d3.select('#selDataset').append('option').text(id).property("value",id));

        // Using D3 select the selected ID to to extract the details to work with
        var selectedid = d3.selectALL("#selDataset").node().value;

        
    }
}