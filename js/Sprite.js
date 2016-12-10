function Sprite (imagePath,spriteMap,spritesPerGridStep){
    this.image = new Image();
    this.image.src = imagePath;
    this.map = spriteMap;
    this.spritesPerGridStep = spritesPerGridStep;
}
