
$(function() {

  var Cipher = {};

  // New Encoded Message
  $(document).on('submit', '.encodetext', function(event){
    event.preventDefault();
    var encodeText = $('textarea').val();
    var count = 0;
    var encodingLength = document.querySelector('input[name="letter"]:checked').value;
    
    if (encodeText) {
      document.getElementById("encode-error").innerHTML = "";
      var encodedMessage = Cipher.encodeCipher(encodeText, count);
      
      if (encodedMessage) {
        var remainder = encodedMessage.length % encodingLength;
        // Pad the encoded messaged with the remainder
        if (remainder != 0) {
          encodedMessage = encodedMessage + "0".repeat(encodingLength-remainder);
        }

        if (encodingLength == 4) {
          encodedMessage = encodedMessage.replace(/(.{4})/g, '$1 ').trim();
        } else {
          encodedMessage = encodedMessage.replace(/(.{5})/g, '$1 ').trim();
        }

        var thread = renderEncodedMessage(encodedMessage);
        $('.responses').prepend(thread);
    
      } else {
      document.getElementById("encode-error").innerHTML = "The input data did not match the cipher";
      }
    } else {
      document.getElementById("encode-error").innerHTML = "Input is empty";
    }
  });

  Cipher.encodeCipher = function(encodeText) {
    var map = {
      a: '24', b: '12', c: '18',
      d: '15', e: '02', f: '06',
      g: '03', h: '09', i: '10',
      j: '19', k: '05', l: '13',
      m: '04', n: '26', o: '11',
      p: '22', q: '01', r: '17',
      s: '16', t: '14', u: '21',
      v: '20', w: '07', x: '25',
      y: '23', z: '08'
    };

    return encodeText.split('').filter(function(v) {
      // Filter out characters that are not in our list
      return map.hasOwnProperty(v.toLowerCase());
    }).map(function(v) {
      // Replace old character with new one and make it uppercase
      return map[v.toLowerCase()].toUpperCase();
    }).join('');
  };

  //Render Encoded Message
  var renderEncodedMessage = function(encodedMessage) {
    var source = $('#encoded-message').html();
    var template = Handlebars.compile(source);
    return template({
      encodedMessage
    });
  }

  // New Decoded Message
  $(document).on('submit', '.decodetext', function(event){
    event.preventDefault();
    document.getElementById("decode-error").innerHTML = "";
    var decodeText = $('.decodetextentry').val();
    
    if(decodeText){
      var decodedMessage = Cipher.decodeCipher(decodeText);
      
      if (decodedMessage) {
        var decodedMessage = decodedMessage.replace(/(.{4})/g, '$1 ').trim();
        var thread = renderEncodedMessage(decodedMessage);
        $('.decodedmessages').prepend(thread);
      } else {
        document.getElementById("decode-error").innerHTML = "The input data did not match the cipher";
      }
    } else {
      document.getElementById("decode-error").innerHTML = "Input is empty";
    }
  });

  Cipher.decodeCipher = function(decodeText) {
    var map = {
      '24': 'a', '12': 'b', '18': 'c',
      '15': 'd', '02': 'e', '06': 'f',
      '03': 'g', '09': 'h', '10': 'i',
      '19': 'j', '05': 'k', '13': 'l',
      '04': 'm', '26': 'n', '11': 'o',
      '22': 'p', '01': 'q', '17': 'r',
      '16': 's', '14': 't', '21': 'u',
      '20': 'v', '07': 'w', '25': 'x',
      '23': 'y', '08': 'z'
    }; 

    return decodeText.replace(/ /g, '').match(/.{1,2}/g).filter(function(v) {
      // Filter out characters that are not in our list
      return map.hasOwnProperty(v.toLowerCase());
    }).map(function(v) {
      // Replace old character with new one and make it uppercase
      return map[v.toLowerCase()].toUpperCase();
    }).join('');
  };

  //Render Decoded Message
  var renderDecodedMessage = function(decodedMessage) {
    var source = $('#decoded-message').html();
    var template = Handlebars.compile(source);
    return template({
      decodedMessage
    });
  }
});
