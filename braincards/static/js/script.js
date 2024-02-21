var originalBG = $("body").css("background-color");
var lightColor = "rgba(255, 235, 167, 0.2)";
var finalLightColor = "rgba(255, 235, 167, 0.0)";
var gradientSize = "800";

$('body').mousemove(function(e) {
    x = e.pageX - this.offsetLeft;
    y = e.pageY - this.offsetTop;
    xy = x + " " + y;
    bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradientSize + ", from(" + lightColor + "), to(" + finalLightColor + ")), " + originalBG;
    bgMoz = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBG + " " + gradientSize + "px)";

    $(this)
        .css({background: bgWebKit})
        .css({background: bgMoz});
    }).mouseleave(function() {
    $(this).css({
        background: originalBG
    });
});