###我的代码报错“incomplete type is not allowed”是怎么回事？
> 状态：已解决

说实话我之前也没遇到过这个问题，这还是头一个看见，花了大概半个小时才解决。这个问题很值得大家警示，是初学者有可能犯的错误，这里记录一下。

这位同学是在写电机的驱动程序的过程中遇到的错误。首先贴上这位同学的代码：
> can_motor.h

```c
#ifndef _CAN_MOTOR_H_
#define _CAN_MOTOR_H_
#define CAN_BUF_SIZE 6

#include "can.h"
#include "pid.h"


HAL_StatusTypeDef CanFilterInit(CAN_HandleTypeDef* hcan);
struct CAN_Motor
{
	int fdbPosition;        //电机的编码器反馈值
	int last_fdbPosition;   //电机上次的编码器反馈值
	int bias_position;      //机器人初始状态电机位置环设定值
	int fdbSpeed;           //电机反馈的转速/rpm
	int round;              //电机转过的圈数
	int real_position;      //过零处理后的电机转子位置
	int diff;               //本次与上次电机过零处理后的编码器反馈值之差
	int velocity;           //根据电机编码器计算得出的速度
	int can_buf[CAN_BUF_SIZE];    //电机编码器值缓存数组
	int buf_count;				//缓存数组计数
	struct PID_t position_pid;	//电机位置环PID
	struct PID_t speed_pid;		//电机速度环PID
};

#define DEFAULT_CAN_MOTOR \
{0,0,0,0,0,0,0,0,{0},0, \
	DEFAULT_PID, DEFAULT_PID \
}

extern struct CAN_Motor m3508_1;
extern struct CAN_Motor m3508_2;
extern struct CAN_Motor m3508_3;
extern struct CAN_Motor m3508_4;

void CanDataEncoderProcess(struct CAN_Motor *motor);
HAL_StatusTypeDef CanFilterInit(CAN_HandleTypeDef* hcan);
void CanTransmit_1234(CAN_HandleTypeDef *hcanx, int16_t cm1_iq, int16_t cm2_iq, int16_t cm3_iq, int16_t cm4_iq);
void CanTransmit_5678(CAN_HandleTypeDef *hcanx, int16_t cm1_iq, int16_t cm2_iq, int16_t cm3_iq, int16_t cm4_iq);
void CanDataReceive(int motor_index);


#endif
```
> pid.h

```c
#ifndef __PID_H
#define __PID_H
#include "can_motor.h"

struct PID_t
{
	float KP;
	float KI;
	float KD;
	int error[2];
	int error_sum;
	int error_max;
	int fdb;
	int ref;
	int output;
	int outputMax;
};

void PID_Calc(struct PID_t *pid);

#define DEFAULT_PID \
{0,0,0,{0,0},0,0,0,0,0,0 \
}

#endif

```
看起来确实没有错误呢，所有的变量都定义好了，而且在编译器里可以执行“Go to Definition”命令，但是编译却有两个**errors**，并出现了下面的错误提示：
```
compiling pid.c...
code\can_motor.h(22): error: #70: incomplete type is not allowed
	struct PID_t position_pid;
code\can_motor.h(23): error: #70: incomplete type is not allowed
	struct PID_t speed_pid;
```
可以从错误的提示中发现，编译器是在编译pid.c的时候发现了错误，那么pid.c文件里面写了什么呢？其实pid.c文件内容很简单，如下：
```c
#include "pid.h"


/**
* @brief PID计算函数。本PID增量式PID，未设置死区
* @param None
* @retval None
*/


void PID_Calc(struct PID_t *pid)
{
	pid->error[0] = pid->error[1];
	pid->error[1] = pid->ref - pid->fdb;
  pid->error_sum += pid->error[1];
  
  /* 积分上限 */
  if(pid->error_sum > pid->error_max) pid->error_sum = pid->error_max;
  if(pid->error_sum < -pid->error_max) pid->error_sum = -pid->error_max;
  
	pid->output = pid->KP*pid->error[1] + pid->KI*pid->error_sum+pid->KD*(pid->error[1]-pid->error[0]);
  
  /* 输出上限 */
	if(pid->output > pid->outputMax) pid->output = pid->outputMax;
	if(pid->output < -pid->outputMax) pid->output = -pid->outputMax;
}
```
这个文件除了引用了`pid.h`外就定义了一个`PID_Calc`函数，那么跟着编译器一步一步走。

首先把`pid.h`文件包含进来，`pid.h`里面有什么呢？它又把`can_motor.h`包含了进来，然后继续跳转到`can_motor.h`，发现它又反过来把`pid.h`包含进来，于是`can_motor.h`和`pid.h`两者相互包含，导致编译器最后获取不到结构体`PID_t`的定义。

仔细观察可以发现，`pid.h`里面其实不需要`can_motor.h`，所以只需要把`pid.h`里面的
```c
#include "can_motor.h"
```
这句话删除就解决问题了。

##总结
我们在写代码的时候，一定要遵循这个原则：

**include的文件之间最好是`单向`的关系。在功能划分的时候，应尽量避免这个问题。**

---
> **评论**
>> 
谢\* ：这个问题说不常见也不常见，说常见也常见，全看个人的编程习惯。请大家一定要牢记：**包含头文件一定一定要单向包含，不能相互包含**。这就像两面镜子相对，里面会反射出无处的镜子，一定要避免这种情况。