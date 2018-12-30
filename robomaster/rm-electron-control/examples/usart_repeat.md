#串口复读机
实现单片机与电脑的通信，单片机接收到电脑的数据之后立即原样发回给电脑。这个案例的关键点在于，如何解决电脑发送的数据长度不定的问题。这里采取的是定义一个很长的数组用于缓存，缺点就是无法接受数据量特别大的消息。
```c
while(1)
{
  if(USART_RX_STA&0x8000)
  {
    len=USART_RX_STA&0x3fff;  //得到此次接收到的数据长度
    printf("\r\n 您发送的消息为:\r\n");
    HAL_UART_Transmit(&UART1_Handler,(uint8_t*)USART_RX_BUF,
    len,1000);            //发送接收到的数据
    while(__HAL_UART_GET_FLAG(&UART1_Handler,
    UART_FLAG_TC)!=SET);  //等待发送结束
    printf("\r\n\r\n");   //插入换行
    USART_RX_STA=0;
  }else
  {
    times++;
    if(times%200==0)
      printf("请输入数据,以回车键结束\r\n");
    if(times%30==0)
      LED0_Toggle;//闪烁 LED,提示系统正在运行.
    delay_ms(10);
  }
}
```