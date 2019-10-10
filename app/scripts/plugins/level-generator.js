import TILES from '../objects/tiles-mapping';

export default class LevelGenerator{

  constructor(dungeon, layer) {
    this.dungeon = dungeon;
    this.layer = layer;
  }

  init(){
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

    this.layer.objectLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);

    otherRooms.forEach(room => {
      let rand = Math.random();
      if(rand <= 0.25) {
        this.layer.objectLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
      }else if (rand <= 0.5) {
        const x = Phaser.Math.Between(room.left + 2, room.right - 2);
        const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        this.layer.objectLayer.weightedRandomize(x, y, 1, 1, TILES.SKULL);
      }else {
        if (room.height >= 5) {
         const skull = this.layer.objectLayer.putTileAt(TILES.SKULL, room.centerX - Math.floor(Math.random() * (3 - 1) + 1), room.centerY + Math.floor(Math.random() * (3 - 1) + 1));
         ReplaceTileIfInDoorway(this.layer.objectLayer, room, skull);
          const box1 = this.layer.objectLayer.putTilesAt(TILES.BOX, room.centerX - Math.floor(Math.random() * (3 - 1) + 1), room.centerY + Math.floor(Math.random() * (3 - 1) + 1));
          ReplaceTileIfInDoorway(this.layer.objectLayer, room, box1);
          const box2 = this.layer.objectLayer.putTilesAt(TILES.BOX, room.centerX + Math.floor(Math.random() * (3 - 1) + 1), room.centerY - Math.floor(Math.random() * (3 - 1) + 1));
          ReplaceTileIfInDoorway(this.layer.objectLayer, room, box2);
        } else {
          const box1 = this.layer.objectLayer.putTilesAt(TILES.BOX, room.centerX - Math.floor(Math.random() * (5 - 1) + 1), room.centerY - Math.floor(Math.random() * (3 - 1) + 1));
          ReplaceTileIfInDoorway(this.layer.objectLayer, room, box1);
          const box2 = this.layer.objectLayer.putTilesAt(TILES.BOX, room.centerX + Math.floor(Math.random() * (5 - 1) + 1), room.centerY - Math.floor(Math.random() * (3 - 1) + 1));
          ReplaceTileIfInDoorway(this.layer.objectLayer, room, box2);
        }
      }
    });
  }

}

const ReplaceTileIfInDoorway = (objectLayer, room, tile) => {
  for (let i = 0; i < room.getDoorLocations().length ; i++) {
    if (room.getDoorLocations()[i].y === tile.y) {
      if (tile.x === room.getDoorLocations()[i].x || tile.x === room.getDoorLocations()[i].x+1 || tile.x === room.getDoorLocations()[i].x-1){
        objectLayer.removeTileAt(tile.x, tile.y);
      }
    }
    if (room.getDoorLocations()[i].x === tile.x) {
      if (tile.y === room.getDoorLocations()[i].y || tile.y === room.getDoorLocations()[i].y+1 || tile.y === room.getDoorLocations()[i].y-1){
        objectLayer.removeTileAt(tile.x, tile.y);
      }
    }
  }
}