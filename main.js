

// change string (from CSV) into number format
//data.forEach(function (d) {
//d.Calories = +d.Calories;
//d["Protein (g)"] = +d["Protein (g)"];
//    console.log(d);

//var start = new Date(2009, 5, 9), 
//end = new Date(2020, 0, 20), 
//range = [0,3863]
//time = d3.scaleTime().domain([start, end])
//.rangeRound(range)

var svg = d3.select(“body”).append(“svg”).attr({ “width”: 450, ”height”: 400});
svg.append(“circle”).attr({ “r”: ”30px”, “cx”: ”50px”, “cy”: ”50px” });

var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// setup x 
var xValue = function (d) { return d.date; }, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xScale = d3.scaleTime().domain([new Date(2009, 5, 9), new Date(2020, 0, 20)]).rangeRound([0, 3863])
xMap = function (d) { return xScale(xValue(d)); }, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function (d) { return d.order; }, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function (d) { return yScale(yValue(d)); }, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");


// setup fill color
var cValue = function (d) { return d.retweets; },
    color = d3.scale.category10();

// add the graph canvas to the body of the webpage
//var svg = d3.select("body").append("svg")
//.attr("width", width + margin.left + margin.right)
//.attr("height", height + margin.top + margin.bottom)
//.append("g")
//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.csv("trumptweets.csv", function (data) {
    data.forEach(function (d) {
        d.order = +d.order;
        d.date = new Date(d.date);
        console.log(d.date)

    });

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Calories");



    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Protein (g)");




    //dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function (d) {
            return color(cValue(d));
        })

});