/*! 
Portfolio Filter 
Creator: HKT (Harshey) 
Created for: Banko Design
NOTE: PLEASE DO NOT MODIFY THIS FILE!!!! 
*/ 
$(document).ready(function() {
    // helper: simple HTML escape for inserting values into markup
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function(m) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
        });
    }

    var buildFilter = "<center><div class='filter'><ul><li class='active' data-value='All'><span>All</span></li>";

    // only iterate if filterItems is an array
    if (Array.isArray(filterItems)) {
        jQuery.each(filterItems, function(i, val) {
            var safeVal = escapeHtml(val);
            var codeToAdd = "<li data-value='" + safeVal + "'><span>" + safeVal + "</span></li>";
            buildFilter = buildFilter + codeToAdd;
        });
    }

    buildFilter = buildFilter.concat("</ul></div></center>");

    $( ".content-collection .content-wrapper .content" ).prepend( buildFilter );
    
    var $filters = $('.filter [data-value]'),
        $boxesGrid = $('#gridThumbs .grid-item');
        
        $('.grid-item img').each(function() {
            // handle missing or malformed focal-point gracefully
            var fpAttr = $(this).attr("data-image-focal-point") || "0.5,0.5";
            var focalPoints = (typeof fpAttr === 'string') ? fpAttr.split(',') : ["0.5","0.5"];
            if (focalPoints.length < 2) { focalPoints = ["0.5","0.5"]; }

            var x = parseFloat(focalPoints[0]);
            var y = parseFloat(focalPoints[1]);
            if (!isFinite(x)) { x = 0.5; }
            if (!isFinite(y)) { y = 0.5; }

            x = (x * 100) + '%';
            y = (y * 100) + '%';

            var actualFocalPoints = x + " " + y;
            var thisImageSrc = $(this).attr("data-src") || "";
            $(this).attr("src", thisImageSrc);
            $(this).css("width", "100%");
            $(this).css("height", "100%");
            $(this).css("object-fit", "cover");
            $(this).css("object-position", actualFocalPoints);
        });

    $filters.on('click', function(e) {

        var $this = $(this);
        $filters.removeClass('active');
        $this.addClass('active');

        var filterValue = ($this.attr('data-value') || "").toString();
        var normalizedFilter = filterValue.toLowerCase().replace(/[\+\-_]/g, ' ').trim();

        if (normalizedFilter === 'all' || normalizedFilter === '') {
            $boxesGrid.removeClass('is-animated');
            $boxesGrid.fadeOut().promise().done(function() {
                $boxesGrid.addClass('is-animated').fadeIn();
            });
        } else {
            $boxesGrid.removeClass('is-animated');
            $boxesGrid.fadeOut().promise().done(function() {
                $('#gridThumbs img').each(function() {
                    var src = $(this).attr("src") || "";
                    var decoded = src;
                    try {
                        decoded = decodeURIComponent(src);
                    } catch (err) {
                        // leave as-is if malformed
                        decoded = src;
                    }
                    // Normalise separators and remove common filename punctuation for robust matching
                    var normalised = decoded.replace(/[\+\-_]/g, ' ').replace(/[.(),]/g, ' ').toLowerCase();
                    // collapse multiple spaces and trim
                    normalised = normalised.replace(/\s+/g, ' ').trim();

                    if (normalised.indexOf(normalizedFilter) !== -1) {
                        $(this).closest(".grid-item").addClass('is-animated').fadeIn();
                    }
                });
            });
        }
    });
});