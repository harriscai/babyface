// variables
var customServiceNumber = '4008183838'
  , debug = false
  , $P = {}


// functions
function createLink(link) {
  var el = $('<a href="' + link.url + '">' + (link.name || link.url) + '</a>')
  
  $.each(['top', 'left', 'width', 'height'], function(i, it) { el.data(it, link[it]) })
  return el
}

function injectScript(src) {
  var s = document.createElement('script')
  s.src = src; s.async = true
  $('script').first().before(s)
}

function injectStyle(src) {
  var s = document.createElement('link')
    , w = Math.min(screen.width, screen.height)
    , subfix = '-320'

  if (window.devicePixelRatio == 2) {
    subfix = '-retina'
  } else if (w > 320) {
    subfix = '-640'
  }

  s.rel = "stylesheet"
  s.href = "css/" + src + subfix + ".css"
  $('head').append(s)
}

function resizeLink(el) {
  var ratio = $(window).width() / 640

  el.each(function() {
    var img = $(this)
      , x = function(i) { return Math.floor(parseInt(img.data(i)) * ratio) }
      , data = {}

    $.each(['top', 'left', 'width', 'height'], function(i, it) { data[it] = x(it) + 'px' })
    img.css(data)
  })
}

function setupHeader() {
  var header = $('#header')

  if (header.length > 0) {
    var arr = [
      '<a href="javascript:history.back();" class="btn-back">back</a>'
    , '<a href="tel:' + customServiceNumber + '" class="btn-call">call</a>'
    ]

    header.find('.header-wrap').append(arr.join(''))
  }
}

$.extend($P, {
  setup: function(options) {
    if (options && options.styles) {
      $.each(options.styles, function(i, src) {
        injectStyle(src)
      })
    }

    setupHeader()

    // set up debug
    if (debug) {
      injectScript("js/helper.js")
    }

    $(function() {
      setTimeout(scrollTo, 200, 0, 1)
    })
  }
})
