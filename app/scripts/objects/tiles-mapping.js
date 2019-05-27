const TILES_MAPPING = {
  BLANK: 20,
  WALL: {
    TOP_LEFT: 261,
    TOP_RIGHT: 260,
    BOTTOM_LEFT: 261,
    BOTTOM_RIGHT: 260,
    TOP: [{ index: 33, weight: 4 }, { index: [67, 99, 323], weight: 1 }],
  },
  FLOOR: [{ index: 129, weight: 4 }, { index: [130, 131, 161, 162, 163], weight: 1 }],
  BOX: [
    [398],
    [430]
  ],
  DOOR: 194,
  CHEST:431,
  SKULL: 462,
  PIKE: 353,
};

export default TILES_MAPPING;
