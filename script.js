// Excercise 1

function get_countries() {
    $.ajax( {
    url: "https://date.nager.at/api/v3/AvailableCountries",
    type: "GET",
    dataType: "json",
    
    success: function ( data ) {
        populate_countries( data );

        if ( localStorage.country ) {
            $('#countries').val( localStorage.country );
        }
    },
    
    error: function () {
        console.log( "An error occurred." );
    } // For other response
});
}

function populate_countries( countriesToGet ) {
    var countries = countriesToGet;
    
    for (let c = 0; c < countriesToGet.length; c++) {
        $('#countries').append($('<option>', {
        val: countries[c].countryCode, 
        text: countries[c].name
    }));
}}

function refresh_holidays( holidays ) {
    var html = "";
    var year = new Date().getFullYear();

    for ( h = 0; h < holidays.length; h++ ) {
        html += "<li>"+ holidays[h].date + " " + holidays[h].localName+"</li>";
    }

    $("#holidayList").html( html );
    $("#year").text( year );
    $("#selectedCountry").text( $("#countries option:selected").text() );
}

function get_holidays ( countryCode ) {
    var year = new Date().getFullYear();

    $.ajax( {
        //url : "https://holidayapi.com/v1/holidays?pretty&key=" + "67530ba6-3f7b-496e-98b9-30bda6337407" + "&country=" + countryCode +"&year=" + year,
        url: "https://date.nager.at/api/v3/PublicHolidays/2025" + "/" + countryCode + "/",
        type: "GET",
        dataType: "json",
        
        success: function ( data ) {
            console.log( data );
            refresh_holidays ( data );
        },
        
        error: function () {
            console.log( "An error occurred." );
        } // For other response
    });
}

$("#countries").change( function() {
    var selectedCountry = $(this).val();
    console.log("Selected country: " + selectedCountry);

    localStorage.setItem( "country", selectedCountry );

    get_holidays( selectedCountry );
});

get_countries();