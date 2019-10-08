//MX1508_ControllerSimplev0.ino
//by Hamish Trolove - www.techmonkeybusiness.com

/*
Pin connections (Arduino Nano):
D9  To Motor Controller Port IN2
D10 To Motor Controller Port IN1
*/

#include <Servo.h>

const int Motor_AF = 5; //Forward Motor A Pin
const int Motor_AB = 3;  //Backward Motor A Pin
const int Motor_BF = 6; //Forward Motor B Pin
const int Motor_BB = 11;  //Backward Motor B Pin

Servo servo_H;
Servo servo_V;

const int servo_hpwm = 9;
const int servo_vpwm = 10;

const int LED_PIN = 14;

void setup()
{
  // Serial Setting0
  Serial.begin(9600);
  servo_H.attach(servo_hpwm); 
  servo_V.attach(servo_vpwm); 

  pinMode(Motor_AF, OUTPUT);
  pinMode(Motor_AB, OUTPUT);
  pinMode(Motor_BF, OUTPUT);
  pinMode(Motor_BB, OUTPUT);
  
  pinMode(LED_PIN,OUTPUT);
}


void loop(){
  if(Serial.available() > 0){  
    String str = Serial.readStringUntil(';');
  
    if(str.substring(0,1) == "F"){
      tank_stop();
      String arg1 = str.substring(1,4);
      String arg2 = str.substring(4,7);
      int L_duty = arg1.toInt();
      int R_duty = arg2.toInt();
      tank_forward(L_duty, R_duty);
    }

    if(str.substring(0,1) == "B"){
      tank_stop();
      String arg1 = str.substring(1,4);
      String arg2 = str.substring(4,7);
      int L_duty = arg1.toInt();
      int R_duty = arg2.toInt();
      tank_back(L_duty, R_duty);
    }

    if(str.substring(0,1) == "R"){
      tank_stop();
      String arg1 = str.substring(1,4);
      String arg2 = str.substring(4,7);
      int L_duty = arg1.toInt();
      int R_duty = arg2.toInt();
      tank_right(L_duty, R_duty);
    }

    if(str.substring(0,1) == "L"){
      tank_stop();
      String arg1 = str.substring(1,4);
      String arg2 = str.substring(4,7);
      int L_duty = arg1.toInt();
      int R_duty = arg2.toInt();
      tank_left(L_duty, R_duty);
    }
    
    if(str.substring(0,1) == "S"){
      tank_stop();
    }

    if(str.substring(0,1) == "H"){
      //servo_H.attach(servo_hpwm); 
      String arg1 = str.substring(1,4);
      int H_tilt = arg1.toInt();
      servo_H.write(H_tilt);
      //servo_H.detach();
    }

    if(str.substring(0,1) == "V"){
      //servo_V.attach(servo_vpwm); 
      String arg1 = str.substring(1,4);
      int V_tilt = arg1.toInt();
      servo_V.write(V_tilt);
      //servo_V.detach(); 
    }
      
    if(str.substring(0,1) == "X"){
      String arg1 = str.substring(1,2);
      int led_switch = arg1.toInt();
      light_led(led_switch);
    }
  }
}

void tank_forward(int L_duty, int R_duty){
    analogWrite(Motor_AF,L_duty);  //Send instructions to Forward motor pin
    analogWrite(Motor_BF,R_duty);  //Send instructions to Forward motor pin
}

void tank_back(int L_duty, int R_duty){
    analogWrite(Motor_AB,L_duty);
    analogWrite(Motor_BB,R_duty); 
}

void tank_right(int L_duty, int R_duty){
    analogWrite(Motor_AF,L_duty);
    analogWrite(Motor_BB,R_duty); 
}

void tank_left(int L_duty, int R_duty){
    analogWrite(Motor_AB,L_duty);
    analogWrite(Motor_BF,R_duty); 
}

void tank_stop(){
    analogWrite(Motor_AF,0);
    analogWrite(Motor_BF,0);
    analogWrite(Motor_AB,0);
    analogWrite(Motor_BB,0);
}

void light_led(int led_switch){
  if(led_switch == 1){
    digitalWrite(LED_PIN, HIGH);
  }else{
        digitalWrite(LED_PIN, LOW);
        }
}
