var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getData = function(artist){
      var url = 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK',
          deferred = $q.defer();
          dataObj = {};
          dataArr = [];
      $http.jsonp(url).then(function(res){
        for(song in res.data.results){
          // console.log(res.data.results)
          dataObj = {
            "Play" : res.data.results[song].previewUrl,
            "Media" : res.data.results[song].kind,
            "Title" : res.data.results[song].trackName,
            "Artist" : res.data.results[song].artistName,
            "Album" : res.data.results[song].collectionName,
            "Artwork" : res.data.results[song].artworkUrl60,
            "iTunes" : res.data.results[song].trackViewUrl,
            "Price" : res.data.results[song].trackPrice,
            "Length" : convertToMinutes(res.data.results[song].trackTimeMillis)
          };
          console.log(res.data.results[song].trackViewUrl);
          dataArr.push(dataObj);
        }
        deferred.resolve(dataArr);
      });
      return deferred.promise;
    }

    var convertToMinutes = function(num){
      var minutes = 0, seconds = num/1000;
      minutes = Math.floor(seconds/60);
      seconds = Math.round(((seconds/60)-minutes)*60);
      return minutes + "m " + seconds + "s";
    };

});
