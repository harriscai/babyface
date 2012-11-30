
function log(text, timeout) {
  var msg = $('#msg')

  if (msg) {  
    var ctn = $('<div>' + text + '</div>')

    msg.append(ctn)

    if (timeout) {
      setTimeout(function() {
        ctn.remove()
      }, timeout * 1000)
    }
  }
}

function printInfo() {
  log('dimension: ' + screen.width + ' x ' + screen.height, 30)
  log('device pixel ratio: ' + window.devicePixelRatio, 30)
  log('user agent: ' + navigator.userAgent, 30)
}

$(document.body).append($('<div id="msg"></div>'))

$(function() {
  $(window).on('resize', function() {
    //log('w * h: ' + screen.width + ' x ' + screen.height, 5)
  })

  printInfo()
})
