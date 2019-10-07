import TILES from '../objects/tiles-mapping';
import TilemapVisibility from '../objects/tilemap-visibility';
import Dungeon from '@mikewesthad/dungeon';

export default class LevelGenerator{

  constructor(dungeon, layer) {
    this.dungeon = dungeon;
    this.layer = layer;
  }

  init(){
    console.log(this.dungeon.tiles);
    this.sword_basic = this.layer.objectLayer.putTileAt(83, 0, 0);
    this.generateDungeonRoom();
    this.generateObject();
  }

  generateDungeonRoom(){
    this.dungeon.rooms.forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;

      this.layer.groundLayer.weightedRandomize(x+1, y+1, width-2, height-2, TILES.FLOOR);


      this.layer.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
      this.layer.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.TOP);
      this.layer.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.TOP);
      this.layer.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.TOP);

      let doors = room.getDoorLocations();
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.layer.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        } else if (doors[i].y === room.height - 1) {
          this.layer.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        } else if (doors[i].x === 0) {
          this.layer.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        } else if (doors[i].x === room.width - 1) {
          this.layer.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        }
      }
    });
  }

  generateObject(){
    const rooms = this.dungeon.rooms.slice();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

    otherRooms.forEach(room => {
      let rand = Math.random();
      let x;
      let y;

      if(rand <= 0.25) {
        this.layer.objectLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
      }else if (rand <= 0.5) {
        x = Phaser.Math.Between(room.left + 2, room.right - 2);
        y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        this.layer.objectLayer.weightedRandomize(x, y, 1, 1, TILES.SKULL);
      }else {
        if (room.height >= 5) {

          do {
              x = room.centerX - this.randXY(3);
              y = room.centerY + this.randXY(3);
          } while( this.coords2neighbours(x,y).indexOf(3) != -1 );
          this.layer.objectLayer.putTileAt(TILES.SKULL, x, y);
          
          do {
              x = room.centerX - this.randXY(3);
              y = room.centerY + this.randXY(3);
          } while( this.coords2neighbours(x,y).indexOf(3) != -1 );
          this.layer.objectLayer.putTilesAt(TILES.BOX, x, y);
                    
          do {
              x = room.centerX + this.randXY(3);
              y = room.centerY - this.randXY(3);
          } while( this.coords2neighbours(x,y).indexOf(3) != -1 );
          this.layer.objectLayer.putTilesAt(TILES.BOX, x, y);
          
        } else {

          do {
            x = room.centerX - this.randXY(5);
            y = room.centerY - this.randXY(3);
          } while( this.coords2neighbours(x,y).indexOf(3) != -1 );
          this.layer.objectLayer.putTilesAt(TILES.BOX, x, y);

          do {
            x = room.centerX + this.randXY(5);
            y = room.centerY - this.randXY(3);
          } while( this.coords2neighbours(x,y).indexOf(3) != -1 );
          this.layer.objectLayer.putTilesAt(TILES.BOX, x, y);
          
        }
      }
    });
  }


  randXY(v){
    return Math.floor(Math.random() * (v - 1) + 1);
  }

  /*
    Converts an [x,y] coordinate to a tile number...
  */
  coords2num(x,y){
    if( ! this.dungeon.tiles.length)
    {
      return;
    }

    let width = this.dungeon.tiles.length;
    let height = this.dungeon.tiles[0].length;

    return y*height + x;
  }


  /*
    Returns the type of tile at the given coordinates :
     0 = nothing
     1 = wall
     2 = ground
     3 = door
  */
  coords2type(x,y){
    return this.dungeon.tiles[x][y]; 
  }


  /*
    Get the list of neighbour tiles
    => Caveat : what about out of bounds ??
  */
  coords2neighbours(x,y){
    return [
      this.dungeon.tiles[x-1][y-1],
      this.dungeon.tiles[x  ][y-1],
      this.dungeon.tiles[x+1][y-1],
      this.dungeon.tiles[x-1][y  ],
      this.dungeon.tiles[x  ][y  ],
      this.dungeon.tiles[x+1][y  ],
      this.dungeon.tiles[x-1][y+1],
      this.dungeon.tiles[x  ][y+1],
      this.dungeon.tiles[x+1][y+1]
    ];

  }

}
