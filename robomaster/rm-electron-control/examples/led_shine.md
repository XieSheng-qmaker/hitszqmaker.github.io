#LED闪烁
指定LED灯在一个循环中闪烁的次数和时间。可以实现一个LED灯表示多个状态，方便指示程序运行状态。程序具体解析见代码注释。
```c
/**
 * @brief LED闪烁函数，可指定LED闪烁次数，使用一个LED灯即可表示多种状态
 * @param GPIOx：指定GPIO口
 *        GPIO_Pin：指定IO口序列号
 *        CYCLE_S：LED灯状态循环时间（=闪烁总时间+熄灭总时间），单位秒
 *        TOGGLE_S：LED灯闪烁总时间，单位秒
 *        shine_times：LED一次循环闪烁的次数
 *        TIME_SPAN：该闪烁函数被调用的周期，单位毫秒
 * @important CYCLE_S一定要比TOGGLE_S大
 * @retval None
 */
void LED_TOGGLE(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin, uint16_t CYCLE_S, uint16_t TOGGLE_S, uint16_t shine_times,uint16_t TIME_SPAN)
{
  static uint32_t timeSpanCount = 0;
  static uint32_t tempCount = 0;
  static uint32_t sec = 0;
  uint32_t sec_cycle = 0;   

  timeSpanCount++;                                            //时间计数，单位为时间间隔TIME_SPAN
  sec = timeSpanCount/(1000/TIME_SPAN);                       //时间计数，单位为秒
  sec_cycle = sec % CYCLE_S;                                  //取值范围: 0----(CYCLE_S-1)

  /* sec_cycle取值在0-TOGGLE_S-1内LED灯闪烁；TOGGLE_S-CYCLE_S内LED灯熄灭 */
  if(sec_cycle/TOGGLE_S == 0)                                 //LED灯闪烁时
  {   
    tempCount++;                                              //LED灯闪烁时间计数，单位为时间间隔TIME_SPAN
    if(shine_times <=0 )                                      //如果闪烁次数为非正数，则LED灯常亮
    {
      HAL_GPIO_WritePin(GPIOx, GPIO_Pin, GPIO_PIN_RESET);
    }
    else if(tempCount%(((1000/TIME_SPAN)*TOGGLE_S)/(2*shine_times)) == 0)     //tempCount被分母整除时闪灯
    {
      HAL_GPIO_TogglePin(GPIOx, GPIO_Pin);
    }			
  }
  else                                                        //LED灯熄灭时
  {
    tempCount = 0;
    HAL_GPIO_WritePin(GPIOx, GPIO_Pin, GPIO_PIN_SET);
  }	
}
```