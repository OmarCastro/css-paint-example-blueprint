class BlueprintPainter {

    static get inputProperties() { 
      return [
        '--blueprint-quadricule-size',
        '--blueprint-padding',
        '--blueprint-background-color',
        '--blueprint-dashes-color',
        '--blueprint-lines-color'
      ];
    }
  
    paint(ctx, geom, properties) {

      const size = parseInt(properties.get('--blueprint-quadricule-size').toString());
      const spacing = parseInt(properties.get('--blueprint-padding').toString());
      const bgColor = parseInt(properties.get('--blueprint-background-color').toString()) || "#4A6DE5";
      const dashesColor = parseInt(properties.get('--blueprint-dashes-color').toString()) || "#dAdDf5";
      const linesColor = parseInt(properties.get('--blueprint-lines-color').toString()) || "#fAfDf5";

      if(size <= 0 || spacing < 0){
        return;
      }

      ctx.setLineDash([size/10, size/10]);
      ctx.fillStyle = bgColor;
      ctx.strokeStyle = dashesColor;
      ctx.fillRect(0, 0, geom.width, geom.height);

      const borderSX = spacing;
      const borderSY = spacing;
      const borderEX = geom.width-spacing;
      const borderEY = geom.height-spacing;
      ctx.beginPath();

      for(let x = borderSX + size, acc = 0.25; x < borderEX; x += size + Math.floor(1 - acc % 1) * size, acc += 0.25) {
        ctx.moveTo(x, borderSY);
        ctx.lineTo(x, borderEY);
      }

      for(let y = spacing + size, acc = 0.25; y < borderEY; y += size + Math.floor(1 - acc % 1) * size, acc += 0.25) {
        ctx.moveTo(borderSX,y);
        ctx.lineTo(borderEX, y);
      }
      ctx.stroke();

      ctx.setLineDash([]);/*remove dashes*/
      ctx.strokeStyle = linesColor;

      ctx.beginPath();
      for(let x = borderSX; x < borderEX; x += 5 * size) {
        ctx.moveTo(x, borderSY);
        ctx.lineTo(x, borderEY);
      }

      ctx.moveTo(borderEX, borderSY);
      ctx.lineTo(borderEX, borderEY);

      for(let y = borderSX; y < borderEY; y += 5 * size) {
        ctx.moveTo(borderSX, y);
        ctx.lineTo(borderEX, y);
      }

      ctx.moveTo(borderSX, borderEY);
      ctx.lineTo(borderEX, borderEY);

      ctx.stroke();
    } 
  }
  
  registerPaint('blueprint', BlueprintPainter);
  