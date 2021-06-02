#include <FB5317M.h>

FB5317M xAxis;

void setup() {
  xAxis.attach(9, 4);
  // xAxis.calibrate();
}

void loop() {
  xAxis.readAngle();

  xAxis.seek(200);
  xAxis.seek(200, 1);

  xAxis.loop();
}
