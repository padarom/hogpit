#include <Arduino.h>
#include <FB5317M.h>

FB5317M xAxis;
FB5317M yAxis;

void setup() {
    Serial.begin(9600);
    xAxis.attach(9, 4);
    yAxis.attach(6, 4);
    // xAxis.calibrate();
    
    // xAxis.seek(PI);
    // yAxis.seek(PI);
}


unsigned int count = 0;

void loop() {
    xAxis.seek(2000);
    yAxis.seek(1500);

    delay(2000);

    xAxis.seek(1500);
    yAxis.seek(2000);

    delay(2000);

    xAxis.seek(1600);
    yAxis.seek(1600);

    delay(5000);

    xAxis.seek(1700);
    yAxis.seek(1300);

    delay(10000);

    /*
    delay(1);
    count++;
    if (count > 3000) {
      xAxis.seek(-xAxis.getSeekingAngle());
      count = 0;
    }
    */
}
