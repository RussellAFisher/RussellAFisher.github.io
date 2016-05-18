$(document).ready(function() {
    var marsDate = "";
    var earthDate = "";
    var cameraAngle = "";
    var whichCamera = "";
    var lastAngle = "";
    var roverArray = [];
    var arrayIndex = 0;
    var getEarthDate = "";
    var getSolDate = "";
    $(".save, .btn").click(function(event) {
        $(".startHidden").hide();
        $('#imgPlace').empty();
        $('#photoInfo').empty();
        event.preventDefault();
        cameraAngle = $('#cameraAngle option:selected').attr("id");
        whichCamera = $('#cameraAngle option:selected').attr("value");
        marsDate = $('#solDate').val();
        earthDate = $('#dateBox').val();
        if (lastAngle !== cameraAngle) {
            arrayIndex = 0;
        }
        if (earthDate === "") {
            $.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + marsDate + "&camera=" + cameraAngle + "&api_key=t5rTsXuOkLjqX0VKm3ZDXDF0pUghwSUtTB5Azlgf").done(function(data) {
                roverArray = (data.photos);
                if (arrayIndex >= roverArray.length) {
                    $('#imgPlace').append("<br><br><br><br><br><br><br><h3>Sorry, that's all the images for<br> this camera angle on this day.<br> Try a different angle or change the date.</h3>");
                    $('#photoInfo').append("<br><br><br><br><br><br><br><h3>Sorry, that's all the images for<br> this camera angle on this day.<br> Try a different angle or change the date.</h3>");
                } else {
                    getEarthDate = data.photos[arrayIndex].earth_date;
                    getSolDate = data.photos[arrayIndex].sol;
                    $('#imgPlace').append('<img src="' + roverArray[arrayIndex].img_src + '" width="100%vw" style="float"/>');
                    $('#photoInfo').append('<h3 id="rawr">This image was taken on: ' + getEarthDate + '</h3><br><h3>Which is mars mission day: ' + getSolDate + '</h3><br><h3>Using the ' + whichCamera + ' camera.</h3><br><h3>Image ' + (arrayIndex + 1) + ' of ' + roverArray.length + '.</h3>');
                    $(".startHidden").show();
                    arrayIndex += 1;
                    lastAngle = cameraAngle;
                }
            }).fail(function(data) {
                $('#imgPlace').append("<br><br><br><br><br><br><br><h3>Sorry, there are no images for<br> this camera angle or this day.<br> This could be due to lack of data<br> or the Sun being between Earth and Mars<br> on the day you queried</h3>");
                $('#photoInfo').append("<br><br><br><br><br><br><br><h3>Sorry, there are no images for<br> this camera angle or this day.<br> This could be due to lack of data<br> or the Sun being between Earth and Mars<br> on the day you queried</h3>");
            });
        } else {
            $.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + earthDate + "&camera=" + cameraAngle + "&api_key=t5rTsXuOkLjqX0VKm3ZDXDF0pUghwSUtTB5Azlgf").done(function(data) {
                console.log(data);
                roverArray = (data.photos);
                if (arrayIndex >= roverArray.length) {
                    $('#imgPlace').append("<br><br><br><br><br><br><br><h3>Sorry, that's all the images for<br> this camera angle on this day.<br> Try a different angle or change the date.</h3>");
                    $('#photoInfo').append("<br><br><br><br><br><br><br><h3>Sorry, that's all the images for<br> this camera angle on this day.<br> Try a different angle or change the date.</h3>");
                } else {
                    getEarthDate = data.photos[arrayIndex].earth_date;
                    getSolDate = data.photos[arrayIndex].sol;
                    $('#imgPlace').append('<img src="' + roverArray[arrayIndex].img_src + '" width="100%vw"/>');
                    $('#photoInfo').append('<h3>This image was taken on: ' + getEarthDate + '</h3><br><h3>Which is mars mission day: ' + getSolDate + '</h3><br><h3>Using the ' + whichCamera + ' camera.</h3><br><h3>Image ' + (arrayIndex + 1) + ' of ' + roverArray.length + '.</h3>');
                    $(".startHidden").show();
                    arrayIndex += 1;
                    lastAngle = cameraAngle;
                }
            }).fail(function(data) {
                $('#imgPlace').append("<br><br><br><br><br><br><br><h3>Sorry, there are no images for<br> this camera angle or this day.<br> This could be due to lack of data<br> or the Sun being between Earth and Mars<br> on the day you queried</h3>");
                $('#photoInfo').append("<br><br><br><br><br><br><br><h3>Sorry, there are no images for<br> this camera angle or this day.<br> This could be due to lack of data<br> or the Sun being between Earth and Mars<br> on the day you queried</h3>");
            });
        }
    });
});
