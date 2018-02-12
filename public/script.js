$(document).ready(function(){
    
    
    
    // Find out what the URL is
    // There is an easier way to do this
    function definePage() {
        var fullURL = window.location.href;
        var splitURL = fullURL.split("");
        
        var holder = [];

        for(i=27; i < splitURL.length; i++) {
            holder.push(splitURL[i]);
        }
        
        var concatURL = holder.join("");
        
        return concatURL;
    }
    
    
    
    // AJAX request to send info to server's API
    function saveData(selection, page, count) {

        $.get( "/data-save", { page: page, selection: selection, count: count }, function(data) {
            
            console.log(data);
            
        });
    }
    
    
    
    // This gets the count data within the option (ie, the badge count)    
    var liveCount1 = $('#option-1').data("count");
    var liveCount2 = $('#option-2').data("count");
    var liveCount3 = $('#option-3').data("count");
    var liveCount4 = $('#option-4').data("count");
    
    // Get other count data for other page 
    
    
    
    
    // Build function to update the html and the chart
    // Fire this function in click listener and end of client side script
    function updater() {
        
        myChart.data.datasets[0].data[0] = liveCount1;
        myChart.data.datasets[0].data[1] = liveCount2;
        myChart.data.datasets[0].data[2] = liveCount3;
        myChart.data.datasets[0].data[3] = liveCount4;
        
        myChart.update();
    };
    
    
    
    // Click listener for option 1
	$("#option-1").on("click", function(){
        
        // Iterate count
        liveCount1++;
        
        // Update badges and chart
        updater();
        
        // Update database
        var page = definePage();        
        var counting = liveCount1;
        saveData('option-1', page, counting);        
	});
	
    
    
    // Click listener for option 2
	$("#option-2").on("click", function(){
        
        // Iterate the count
        liveCount2++;
        
        // Update badges and chart
        updater();
        
        // Send new data to the db
        var page = definePage();        
        var counting = liveCount2;
        saveData('option-2', page, counting);
	});
	
    

    // Click listener for option 3
    $("#option-3").on("click", function(){
        
        // Iterate the count
        liveCount3++;
        
        //Update badges and chart
        updater();

        
        // Send new data to the db
        var page = definePage();        
        var counting = liveCount3;
        saveData('option-3', page, counting);
	});
    
    
    
    // Click listener for option 4
    $("#option-4").on("click", function(){
        
        // Iterate the count
        liveCount4++;
        
        // Update badges and chart
        updater();
        
        // Send new data to the db
        var page = definePage();        
        var counting = liveCount4;
        saveData('option-4', page, counting);
	});
    
   
    
    // ChartJS
    var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ["Red", "Blue", "Yellow", "Green"],
			datasets: [{
				label: '# of Votes',
				data: [0, 0, 0, 0],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});
    

    
    // Make sure we update the chart and badges everytime page is reloaded
    updater();
    
    
    
    
}); // End document ready