#include <Arduino.h>
#include <Servo.h>

class FB5317M {
  private:

  Servo servo;
  int currentSpeed;
  int maximumReading;
  uint8_t dataPin;
  uint8_t feedbackPin;
  float seekingAngle;

  int readFeedbackValue();
  float seekingError();
  void updateSeekingSpeed();

  public:

  void calibrate();
  void attach(uint8_t dataPin, uint8_t feedbackPin);

  void seek(float angleInRadians);
  void loop();

  float currentAngle();
  float getSeekingAngle();
  bool isAtPosition(float angleInRadians);
};
