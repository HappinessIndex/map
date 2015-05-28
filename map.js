$(document).ready(function(){
	L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
	var map = L.mapbox.map('map', 'mapbox.streets')
	    .setView([-41.28760, 174.78639], 15);	

	L.geoJson(statesData).addTo(map);

	
	//Coloring density function
	function getColor(d) {
    return d > 1000 ? '#034e7b' :
           d > 500  ? '#0570b0' :
           d > 200  ? '#3690c0' :
           d > 100  ? '#74a9cf' :
           d > 50   ? '#a6bddb' :
           d > 20   ? '#d0d1e6' :
           d > 10   ? '#ece7f2' :
                      '#fff7fb' ;
	}

	

	//Applies color and adds dashed outline + opacity
	function style(feature) {
	    return {
	        fillColor: getColor(feature.properties.density),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	L.geoJson(statesData, {style: style}).addTo(map);



	//Defines event listner for mouseover highlighting of state. Sets thicker border & color, also bringing it to the front so that the border doesn’t clash with nearby states (but not for IE or Opera, since they have problems doing bringToFront on mouseover).
	function highlightFeature(e) {
	    var layer = e.target;

	    layer.setStyle({
	        weight: 5,
	        color: '#666',
	        dashArray: '',
	        fillOpacity: 0.7
	    });

	    if (!L.Browser.ie && !L.Browser.opera) {
	        layer.bringToFront();
	    }
	}

	//Function to define mouseout. The handy geojson.resetStyle method will reset the layer style to its default state (defined by our style function). For this to work, make sure our GeoJSON layer is accessible through the geojson variable by defining it before our listeners and assigning the layer to it later
	function resetHighlight(e) {
    	geojson.resetStyle(e.target);
	}

	// //Defines listner for zoom onclick
	// function zoomToFeature(e) {
 	//map.fitBounds(e.target.getBounds());
	// }

	//Adds all previously defined listners to state layers
	function onEachFeature(feature, layer) {
	    layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	       	//click: zoomToFeature
	    });
	}

	geojson = L.geoJson(statesData, {
	    style: style,
	    onEachFeature: onEachFeature
	}).addTo(map);

})

	

