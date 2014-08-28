(function() {
  // Get the information
  var lines = [].slice.call(document.querySelectorAll('.prompt p'));
  var texts = lines.map(function(line) { return line.textContent; });
  var htmls = lines.map(function(line) { return line.innerHTML; });

  // Clear every element
  lines.forEach(function(line) { line.innerHTML = ''; });

  // Perform the typing of every line
  var i = 0;
  function typeLine() {
    if (i < lines.length) {
      // Get the information about the line
      var line = lines[i], text = texts[i], html = htmls[i];
      var cmd = 'echo "' + text + '"';

      // Initial line content
      line.appendChild(document.createTextNode('$ '));
      line.classList.add('active');

      // Print every character
      var c = 0;
      function typeChar() {
        if (c < cmd.length) {
          // Print a char
          var character = document.createTextNode(cmd.charAt(c));
          line.appendChild(character);
          c++;

          setTimeout(typeChar, 30);
        } else {
          // Print the output
          var result = document.createElement('div');
          result.setAttribute('class', 'output');
          result.innerHTML = html;
          line.appendChild(result);
          line.classList.remove('active');

          i++;
          setTimeout(typeLine, 300);
        }
      }

      typeChar();
    }
  }

  typeLine();
})();
