/*header clock */
function updateClock(){
			var now = new Date();
			var dname = now.getDay(),
				mo = now.getMonth(),
				dnum = now.getDate(),
				yr = now.getFullYear(),
				hou = now.getHours(),
				min = now.getMinutes(),
				sec = now.getSeconds(),
				pe = "AM";

				if(hou >= 12){
					pe = "PM";
				}
				if(hou == 0){
					hou = 12;
				}
				if(hou > 12){
					hou = hou - 12;
				}

				Number.prototype.pad = function(digits){
					for(var n = this.toString(); n.length < digits; n = 0 + n);
					return n;
				}

				var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
				var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
				var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
				for(var i = 0; i < ids.length; i++)
					document.getElementById(ids[i]).firstChild.nodeValue = values[i];
				}

			function initClock(){
				updateClock();
				window.setInterval("updateClock()", 1);
			}

/*dropdown*/
  document.addEventListener("DOMContentLoaded", function () {
        // Get all dropdown buttons and containers
        var dropdownBtns = document.querySelectorAll('.dropdown-btn');
        var dropdownContainers = document.querySelectorAll('.dropdown-container');

        // Toggle the dropdown content when a button is clicked
        dropdownBtns.forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                dropdownContainers[index].style.display = (dropdownContainers[index].style.display === 'block') ? 'none' : 'block';
            });
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener('click', function (event) {
            dropdownBtns.forEach(function (btn, index) {
                if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-container') && !event.target.closest('.dropdown-container')) {
                    dropdownContainers[index].style.display = 'none';
                }
            });
        });
    });

/*video gallery*/
jQuery(document).ready(function($) {
    var slider = $(".royalSlider").royalSlider({
        arrowsNav: false,
    fadeinLoadedSlide: true,
    controlNavigationSpacing: 0,
    controlNavigation: 'thumbnails',
    thumbs: {
      autoCenter: false,
      fitInViewport: true,
      orientation: 'vertical',
      spacing: 0,
      paddingBottom: 0
    },
    keyboardNavEnabled: true,
    imageScaleMode: 'fill',
    imageAlignCenter:true,
    slidesSpacing: 0,
    loop: false,
    loopRewind: true,
    numImagesToPreload: 3,
    video: {
      autoHideArrows:true,
      autoHideControlNav:false,
      autoHideBlocks: true
    }, 
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 450,
    imgWidth: 640,
    imgHeight: 360
    }).data('royalSlider');
    
    slider.ev.on('rsOnCreateVideoElement', function() {
        var f = slider.videoObj,
        url = f.attr('src').split('?')[0];
        // postMessage
        function post(action, value) {
            var data = { method: action };
            if (value) {
                data.value = value;
            }
            if (f && f[0] && f[0].contentWindow) f[0].contentWindow.postMessage(JSON.stringify(data), url);
        }
        // display event
        function onMessageReceived(e) {
            var data = JSON.parse(e.data);
            // Add listeners here
            if (data.event === 'ready') {
                // post('addEventListener', 'play');
                // post('addEventListener', 'pause');
                post('addEventListener', 'finish');
            }
            if (data.event === 'finish') {
              if (data.event === 'finish') {
                setTimeout(function(){
                  var $slider = $('.royalslider');
                    slider.next();
                    console.log(slider.currSlideId);
                },2000);
            }
             }
        }
        if (window.addEventListener){
            window.addEventListener('message', onMessageReceived, false);
        } else { // IE
            window.attachEvent('onmessage', onMessageReceived, false);
        }
    });
});
