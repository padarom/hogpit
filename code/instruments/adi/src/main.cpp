// ADI is bus device #1
#define DCSBIOS_RS485_SLAVE 1
#define TXENABLE_PIN 2

#include <DcsBios.h>

DcsBios::PotentiometerEWMA<5, 128, 5> stallVol("STALL_VOL", A0);

void setup() {
    DcsBios::setup();
}

void loop() {
    DcsBios::loop();
}
