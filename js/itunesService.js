var app = angular.module('itunes');

app.service('itunesService', function($http, $q){

    this.dataArray = [];
    this.getData =
    function(artist){
      var url = 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK',
          deferred = $q.defer();
          dataObj = {};
          dataArr = [];
      $http.jsonp(url).then(function(res){
        console.log(res.data.results);
        this.dataArray = res.data.results;
        for(song in res.data.results){
          var x = res.data.results[song];
          dataObj = {
            "Play" : x.previewUrl,
            "Media" : x.kind,
            "Title" : x.trackName,
            "Artist" : x.artistName,
            "Album" : x.collectionName,
            "Artwork" : x.artworkUrl60,
            "Rating" : x.contentAdvisoryRating,
            "iTunes" : x.trackViewUrl,
            "Purchase" : x.trackPrice,
            "HDPrice" : x.trackHdPrice,
            "Rent" : x.trackRentalPrice,
            "HDRent" : x.trackHdRentalPrice,
            "AlbumCost" : x.collectionPrice,
            "Length" : convertToTime(x.trackTimeMillis),
            "Genra" : x.primaryGenreName,
            "Released" : x.releaseDate,
            "TrackId" : x.trackNumber,
            "Track" : trackTrack(x.trackNumber, x.trackCount),
            "Description" : x.longDescription,
            "Descrip" : x.shortDescription
          };
          console.log(res.data.results[song].trackViewUrl);
          dataArr.push(dataObj);
        }
        deferred.resolve(dataArr);
      });
      return deferred.promise;
    }

    var convertToTime = function(num){
      var seconds = num/1000;
      var minutes = Math.floor(seconds/60);
      seconds = Math.floor(((seconds/60)-minutes)*60);
      var str = "";
      if(minutes >= 60){
        var hours = Math.floor(minutes/60);
        minutes = Math.floor(((minutes/60)-hours)*60);
      }
      if(hours) return hours + "h " + minutes + "m";
      else return minutes + "m " + seconds + "s";
    };
    var trackTrack = function(x, y){
      if(x && y) return x + '/' + y;
      if(x) return x;
      if(y) return "-/" + y;
      else return "-";
    };

    this.getGraphData = function(media){
      console.log(media);
      switch(media){
        case "Song": console.log("I'm SINGING");
          return [
          {field: 'Play', displayName: 'Play', width: 50, cellTemplate: '<div class="ngCellText"><a href="{{COL_FIELD}}" target="_blank"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
          {field: 'Media', displayName: 'Media', width: 65, cellTemplate: '<div class="ngCellText">{{COL_FIELD}}</div>'},
          {field: 'Title', displayName: 'Title', minWidth: 150, cellTooltip: function(row, col){ return row.entity.Description; }},
          {field: 'Artist', displayName: 'Artist', minWidth: 150},
          {field: 'Track', displayName: 'Track', maxWidth: 60},
          {field: 'Album', displayName: 'Album', minWidth: 150},
          {field: 'Artwork', displayName: 'Artwork', width: 75, cellTemplate: '<div class="ngCellText"><img src="{{COL_FIELD}}"></div>'},
          {field: 'iTunes', displayName: 'iTunes', maxWidth: 75, cellTemplate: '<div class="ngCellText"><a href="{{COL_FIELD}}" target="_blank">View</a></div>'},
          {field: 'Purchase', displayName: 'Single', maxWidth: 100, cellFilter: 'currency'},
          {field: 'AlbumCost', displayName: 'Album', maxWidth: 100, cellFilter: 'currency'},
          {field: 'Length', displayName: 'Length', maxWidth: 100},
          {field: 'Genra', displayName: 'Genra', maxWidth: 150}
        ];
        case "Movie": console.log("I'm MOVING");
          return [
          {field: 'Play', displayName: 'Play', width: 50, cellTemplate: '<div class="ngCellText"><a href="{{COL_FIELD}}" target="_blank"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
          {field: 'Media', displayName: 'Media', maxWidth: 65, cellTemplate: '<div class="ngCellText">{{COL_FIELD}}</div>'},
          {field: 'Title', displayName: 'Title', minWidth: 150, cellTooltip: function(row, col){ return row.entity.Description; }},
          {field: 'Artwork', displayName: 'Artwork', width: 75, cellTemplate: '<div class="ngCellText"><img src="{{COL_FIELD}}"></div>'},
          {field: 'iTunes', displayName: 'iTunes', width: 75, cellTemplate: '<div class="ngCellText"><a href="{{COL_FIELD}}" target="_blank">View</a></div>'},
          {field: 'Rating', displayName: 'Rating', maxWidth: 100},
          {field: 'HDPrice', displayName: 'Buy(HD)', cellFilter: 'currency', maxWidth: 100},
          {field: 'Purchase', displayName: 'Buy', cellFilter: 'currency', maxWidth: 100},
          {field: 'HDRent', displayName: 'Rent(HD)', cellFilter: 'currency', maxWidth: 100},
          {field: 'Rent', displayName: 'Rent', cellFilter: 'currency', maxWidth: 100},
          {field: 'Length', displayName: 'Length', maxWidth: 100},
          {field: 'Released', displayName: 'Released', cellFilter: 'date', maxWidth: 100},
          {field: 'Genra', displayName: 'Genra', maxWidth: 150}
        ];
        case "Tv": console.log("I'm TVING");
          return [
          {field: 'Play', displayName: 'Play', width: 50, cellTemplate: '<div class="ngCellText"><a href="{{COL_FIELD}}" target="_blank"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
          {field: 'Media', displayName: 'Media', width: 65, cellTemplate: '<div class="ngCellText">{{COL_FIELD}}</div>'},
          {field: 'Title', displayName: 'Title', minWidth: 150, cellTooltip: function(row, col){ return row.entity.Description; }},
          {field: 'Track', displayName: 'Track', maxWidth: 60},
          {field: 'Album', displayName: 'Album', minWidth: 150},
          {field: 'Artwork', displayName: 'Artwork', width: 75, cellTemplate: '<div class="ngCellText"><img src="{{COL_FIELD}}"></div>'},
          {field: 'iTunes', displayName: 'iTunes', maxWidth: 75, cellTemplate: '<div class="ngCellText"><a href="{{COL_FIELD}}" target="_blank">View</a></div>'},
          {field: 'Rating', displayName: 'Rating', maxWidth: 100},
          {field: 'HDPrice', displayName: 'Buy(HD)', cellFilter: 'currency', maxWidth: 100},
          {field: 'Purchase', displayName: 'Buy', cellFilter: 'currency', maxWidth: 100},
          {field: 'AlbumCost', displayName: 'Album', maxWidth: 100, cellFilter: 'currency'},
          {field: 'Length', displayName: 'Length', maxWidth: 100},
          {field: 'Released', displayName: 'Released', cellFilter: 'date', maxWidth: 100},
          {field: 'Genra', displayName: 'Genra', maxWidth: 150}
        ];
        default:
          console.log("Whelp, this is awkward...");
          alert("Error. Does not compute.");
      }
    };

});
