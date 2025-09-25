/*! 
Portfolio Filter 
Creator: HKT (Harshey) 
Created for: Banko Design
NOTE: PLEASE DO NOT MODIFY THIS FILE!!!! 
*/ 
$(document).ready(function() {
	var buildFilter = "<center><div class='filter'><ul><li class='active' data-value='All'><span>All</span></li>";

	jQuery.each( filterItems, function( i, val ) {
		var codeToAdd = "<li data-value='"+ val +"'><span>"+ val +"</span></li>"
		buildFilter = buildFilter + codeToAdd;
	});

	var buildFilter = buildFilter.concat("</ul></div></center>");

	$( ".content-collection .content-wrapper .content" ).prepend( buildFilter );
	
    var $filters = $('.filter [data-value]'),
		$boxesGrid = $('#gridThumbs .grid-item');
		
		$('.grid-item img').each(function() {
			var $focalPoint = $(this).attr("data-image-focal-point");
			var $focalPoints = $focalPoint.split(',');
			$focalPoints[0] = $focalPoints[0]*100 + '%';
			$focalPoints[1] = $focalPoints[1]*100 + '%';
			var $actualFocalPoints = $focalPoints.join(" ");
			var $thisImageSrc = $(this).attr("data-src");
			$(this).attr("src", $thisImageSrc);
			$(this).css("width", "100%");
			$(this).css("height", "100%");
			$(this).css("object-fit", "cover");
			$(this).css("object-position", $actualFocalPoints);
		});

    $filters.on('click', function(e) {

        var $this = $(this);
        $filters.removeClass('active');
        $this.addClass('active');

        var $filterValue = $this.attr('data-value');
        var $altText = "All";
        if ($filterValue.toLowerCase() == 'all') {
			$boxesGrid.removeClass('is-animated');
				$boxesGrid.fadeOut().promise().done(function() {
					$boxesGrid.addClass('is-animated').fadeIn();
				});
        } else {
			$boxesGrid.removeClass('is-animated');
				$boxesGrid.fadeOut().promise().done(function() {
					$('#gridThumbs img').each(function() {
						var $altText = $(this).attr("src").replace(/\+/g, ' ');
						if ($altText.toLowerCase().indexOf($filterValue.toLowerCase()) != -1) {
							$(this).closest(".grid-item").addClass('is-animated').fadeIn();
						}
					});
				});
		}
    });
});