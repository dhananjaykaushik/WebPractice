(function() {

  var counter = 1;

  document.getElementById('btn').addEventListener('click', function() {
    if(counter > 3) {
      document.getElementById('btn').classList.add("hide-me");
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://learnwebcode.github.io/json-example/animals-"+counter+".json");
      xhr.onload = function() {
        var myData = JSON.parse(xhr.responseText);
        newAnimal(myData);
      };
      xhr.onerror = function() {
        console.log("ERROR ERROR");
      };
      xhr.send();
      ++counter;
    }

  });

  function newAnimal(obj) {
    var str = "";

    for(var i = 0, l = obj.length; i < l; ++i) {
      str += "<p>"+obj[i].name + " is a " + obj[i].species + " who likes " + obj[i].foods.likes[0]+"</p>";
    }

    document.getElementById('animal-info').insertAdjacentHTML('beforeend', str);
  }
})();
