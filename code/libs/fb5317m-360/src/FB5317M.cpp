#include <FB5317M.h>

// Threshold is defined in radians
#define THRESHOLD       0.05

void FB5317M::calibrate() {
    // Find a rough maximum by checking the feedback once every n microseconds
    servo.writeMicroseconds(2000);
    for (int i = 0; i < 3000; i++) {
        maximumReading = max(maximumReading, readFeedbackValue());
        delayMicroseconds(1000);
    }

    Serial.print("First estimate ");
    Serial.print(maximumReading);
    Serial.println("");

    seek(0);

    // Move to 0 repeatedly
    for (int i = 5; i > 0; i--) {
        char dir = (i % 2 == 0) ? -1 : 1;
        int speed = 1500 + dir * i * 100;

        servo.writeMicroseconds(speed);
        delay(1000);
    }

    servo.writeMicroseconds(1500);
    return;
    unsigned int trial = 0;
    bool direction = 1;
    while (trial < 5) {
        int reading = readFeedbackValue();
        maximumReading = max(maximumReading, reading);

        if (reading < maximumReading - 100) {
            servo.writeMicroseconds(1500);
        }

        trial++;
        delayMicroseconds(300);
    }

    seek(0);
    while (!isAtPosition(0)) {
        delay(0);
    }

    Serial.print(maximumReading);
    Serial.println("");
}

void FB5317M::attach(uint8_t dataPin, uint8_t feedbackPin) {
    this->dataPin = dataPin;
    this->feedbackPin = feedbackPin;

    servo = *(new Servo());
    servo.attach(dataPin);
}

int FB5317M::readFeedbackValue() {
    return analogRead(feedbackPin);
}

void FB5317M::seek(float angleInRadians) {
    seekingAngle = angleInRadians;
    loop();
}

float FB5317M::seekingError() {
    float difference = currentAngle() - seekingAngle;
    while (difference < -PI) difference += TWO_PI;
    while (difference > PI) difference -= TWO_PI;

    return difference;
}

void FB5317M::loop() {
    servo.writeMicroseconds(seekingAngle);
    return;
    float error = seekingError();
    
    if (abs(error) < PI / 4) {
        int speed = max(abs(error) / (PI / 4) * 250, 50);
        currentSpeed = error < 0 ? speed : -speed;
    } else {
        currentSpeed = error < 0 ? 350 : -350;
    }

    if (isAtPosition(seekingAngle)) {
        Serial.print("!! ");
        currentSpeed = 0;
    }

    // 500  = Max Counter-Clockwise
    // 1500 = Stop
    // 2500 = Max Clockwise
    servo.writeMicroseconds(1500 + currentSpeed);

    Serial.print("Currently at ");
    Serial.print(currentAngle());
    Serial.print(". Seeking ");
    Serial.print(seekingAngle);
    Serial.print("; Diff: ");
    Serial.print(seekingError());
    Serial.print(" -> Speed: ");
    Serial.print(currentSpeed); 
    Serial.print("/");
    Serial.print(PI / 4); 
    Serial.println();
}

float mapFloat(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

float FB5317M::currentAngle() {
    return mapFloat(readFeedbackValue(), 0, maximumReading, 0, TWO_PI);
}


float FB5317M::getSeekingAngle() {
    return seekingAngle;
}

bool FB5317M::isAtPosition(float angleInRadians) {
    return abs(angleInRadians - currentAngle()) < THRESHOLD;
}
