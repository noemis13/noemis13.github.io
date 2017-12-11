(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map1",
{ "height":16,
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":16,
         "name":"Camada de Tiles 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "name":"Camada de Objetos 1",
         "objects":[
                {
                 "gid":1,
                 "height":30,
                 "id":1,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":160,
                 "y":90
                }, 
                {
                 "gid":2,
                 "height":30,
                 "id":3,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":96.2148277875073,
                 "x":32,
                 "y":240
                }, 
                {
                 "gid":2,
                 "height":30,
                 "id":4,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":96.2148,
                 "x":192,
                 "y":360
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextobjectid":5,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.0.3",
 "tileheight":30,
 "tilesets":[
        {
         "columns":8,
         "firstgid":1,
         "image":"map-objects.png",
         "imageheight":64,
         "imagewidth":256,
         "margin":0,
         "name":"map-objects",
         "spacing":0,
         "tilecount":16,
         "tileheight":30,
         "tilewidth":32
        }],
 "tilewidth":32,
 "type":"map",
 "version":1,
 "width":10
});