var app = function () {
  navigator.getUserMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;
  var snapshots = document.getElementById('snapshots');
  
  function snapshot() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0);
      var link = document.createElement('a');
      link.setAttribute('target', '_blank');
      var img = document.createElement('img');
      img.src = canvas.toDataURL('image/webp');
      link.setAttribute('href', img.src);
      link.appendChild(img);
      snapshots.appendChild(link);
    };
  }

  document.querySelector('button').addEventListener('click', snapshot, false);

  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;
    }, function() {
      alert('Aaaaaaaaaaaaand it\'s gone');
    });
  } else {
    video.src = 'somevideo.webm'; // fallback.
  }
};