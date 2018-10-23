//*****************************************************************************************全局变量
var type = "infantry";
var FullBlood = 750;
var bullet = "small";

//****************************************************************************************页面初始化
function Init()
{
	document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
	document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
	document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
	document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
	document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
	document.getElementById("CurrentHeat").innerHTML = 0;
	document.getElementById("CurrentHeat1").innerHTML = 0;
	document.getElementById("CurrentKind").innerHTML = "步兵";
	document.getElementById("CurrentLevel").innerHTML = 1;
	document.getElementById("LimiteHeat").innerHTML = 1600;
	document.getElementById("CoolPerMi").innerHTML = 500;
	document.getElementById("CurrentBlood").innerHTML = 750;
	document.getElementById("LimiteHeat1").innerHTML = 0;
	document.getElementById("CoolPerMi1").innerHTML = 0;
	document.getElementById("LimiteSpeed").innerHTML = 30;
	document.getElementById("LimiteSpeed1").innerHTML = 16.5;
}

//***************************************************************************************热量和扣血机制
//热量冷却
function HeatRecover()
{
	var CurrentHeat = document.getElementById("CurrentHeat").innerHTML;
	var CurrentHeat1 = document.getElementById("CurrentHeat1").innerHTML;
	var CurrentLevel = document.getElementById("CurrentLevel").innerHTML;
	CurrentHeat = parseInt(CurrentHeat);
	CurrentLevel = parseInt(CurrentLevel);
	if(type == "infantry")
	{
		if(CurrentLevel == 1)
		{
			CurrentHeat = CurrentHeat - 50;
		}else if(CurrentLevel == 2)
		{
			CurrentHeat = CurrentHeat - 100;
		}else if(CurrentLevel == 3)
		{
			CurrentHeat = CurrentHeat - 200;
		}
		if(CurrentHeat <= 0)
		{
			CurrentHeat = 0;
		}
	}
	if(type == "hero")
	{
		if(CurrentLevel == 1)
		{
			CurrentHeat1 = CurrentHeat1 - 160;
			CurrentHeat = CurrentHeat - 50;
		}else if(CurrentLevel == 2)
		{
			CurrentHeat1 = CurrentHeat1 - 320;
			CurrentHeat = CurrentHeat - 100;
		}else if(CurrentLevel == 3)
		{
			CurrentHeat1 = CurrentHeat1 - 640;
			CurrentHeat = CurrentHeat - 200;
		}
		if(CurrentHeat1 <= 0)
		{
			CurrentHeat1 = 0;
		}
		if(CurrentHeat <= 0)
		{
			CurrentHeat = 0;
		}
	}
	if(type == "centry")
	{
		CurrentHeat = CurrentHeat - 150;
		if(CurrentHeat <= 0)
		{
			CurrentHeat = 0;
		}
	}
	document.getElementById("CurrentHeat").innerHTML = CurrentHeat;
	document.getElementById("CurrentHeat1").innerHTML = CurrentHeat1;
}

//扣血机制
function LoseBlood()
{
	var CurrentHeat = document.getElementById("CurrentHeat").innerHTML;
	var CurrentBlood = document.getElementById("CurrentBlood").innerHTML;
	var LimiteHeat = document.getElementById("LimiteHeat").innerHTML;
	var CurrentHeat1 = parseInt(document.getElementById("CurrentHeat1").innerHTML);
	CurrentHeat = parseInt(CurrentHeat);
	CurrentBlood = parseInt(CurrentBlood);
	LimiteHeat = parseInt(LimiteHeat);
	//热量扣血
	if(CurrentHeat > 1.5 * LimiteHeat)
	{
		CurrentBlood = CurrentBlood - (CurrentHeat - 1.5 * LimiteHeat) / 2000 * FullBlood;
		CurrentHeat = 1.5 * LimiteHeat;
	}else if(CurrentHeat > LimiteHeat)
	{
		CurrentBlood = CurrentBlood - FullBlood * 0.1 * (CurrentHeat - LimiteHeat) / 2000;
	}
	if(CurrentHeat1 > 1.5 * LimiteHeat)
	{
		CurrentBlood = CurrentBlood - (CurrentHeat1 - 1.5 * LimiteHeat) / 2000 * FullBlood;
		CurrentHeat1 = 1.5 * LimiteHeat;
	}else if(CurrentHeat1 > LimiteHeat)
	{
		CurrentBlood = CurrentBlood - FullBlood * 0.1 * (CurrentHeat1 - LimiteHeat) / 2000;
	}
	if(CurrentBlood <= 0)
	{
		CurrentBlood = 0;
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	}
	document.getElementById("CurrentBlood").innerHTML = CurrentBlood;
}

//*******************************************************************发射弹丸增加热量*****************************************************
//手动发射小弹丸
function ManSmall()
{
	var Speed = document.getElementById("Speed1").value;
	var CurrentHeat = document.getElementById("CurrentHeat").innerHTML;
	CurrentHeat = parseInt(CurrentHeat);
	CurrentHeat = CurrentHeat + Speed * Speed;
	document.getElementById("CurrentHeat").innerHTML = CurrentHeat;
	//射速扣血
	var CurrentSpeed = document.getElementById("Speed1").value;
	var LimiteSpeed = parseInt(document.getElementById("LimiteSpeed").innerHTML);
	var CurrentBlood = parseInt(document.getElementById("CurrentBlood").innerHTML);
	if(CurrentSpeed > LimiteSpeed)
	{
		if(CurrentSpeed < LimiteSpeed + 5)
		{
			CurrentBlood = CurrentBlood - FullBlood / 10;
		}else if(CurrentSpeed < LimiteSpeed + 10)
		{
			CurrentBlood = CurrentBlood - FullBlood / 2;
		}else{
			CurrentBlood = CurrentBlood - FullBlood;
		}
	}
	if(CurrentBlood <= 0)
	{
		CurrentBlood = 0;
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	}
	document.getElementById("CurrentBlood").innerHTML = CurrentBlood;
}

//手动发射大弹丸
function ManBig()
{
	var CurrentHeat = document.getElementById("CurrentHeat1").innerHTML;
	CurrentHeat = parseInt(CurrentHeat);
	CurrentHeat = CurrentHeat + 1600;
	document.getElementById("CurrentHeat1").innerHTML = CurrentHeat;
	//射速扣血
	var CurrentSpeed = document.getElementById("Speed2").value;
	var LimiteSpeed = parseInt(document.getElementById("LimiteSpeed1").innerHTML);
	var CurrentBlood = parseInt(document.getElementById("CurrentBlood").innerHTML);
	if(CurrentSpeed > LimiteSpeed)
	{
		if(CurrentSpeed <= LimiteSpeed * 1.1)
		{
			CurrentBlood = CurrentBlood - FullBlood / 50;
		}else if(CurrentSpeed <= LimiteSpeed * 1.2)
		{
			CurrentBlood = CurrentBlood - FullBlood / 20;
		}else{
			CurrentBlood = CurrentBlood - FullBlood / 10;
		}
	}
	if(CurrentBlood <= 0)
	{
		CurrentBlood = 0;
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	}
	document.getElementById("CurrentBlood").innerHTML = CurrentBlood;
}

//自动发射小弹丸
function autoSmall()
{
	var Speed = document.getElementById("Speed3").value;
	var frequency = document.getElementById("frequency1").value;
	var time1 = document.getElementById("time1").value;
	if(frequency == '' || frequency == undefined || frequency == null || time1 == '' || time1 == undefined || time1 == null || Speed == '' || Speed == undefined || Speed == null)
	{
		alert("有一处或多处输入为空");
	}else{
		time1 = 1000 * time1;
		var time = 1000 / frequency;
		var Blood;
		var autoSmall = setInterval(function(){
			var CurrentBlood = parseInt(document.getElementById("CurrentBlood").innerHTML);
			var CurrentHeat = document.getElementById("CurrentHeat").innerHTML;
			CurrentHeat = parseInt(CurrentHeat);
			CurrentHeat = CurrentHeat + Speed * Speed;
			document.getElementById("CurrentHeat").innerHTML = CurrentHeat;
			//射速扣血
			var CurrentSpeed = document.getElementById("Speed3").value;
			var LimiteSpeed = parseInt(document.getElementById("LimiteSpeed").innerHTML);
			if(CurrentSpeed > LimiteSpeed)
			{
				if(CurrentSpeed < LimiteSpeed + 5)
				{
					CurrentBlood = CurrentBlood - FullBlood / 10;
				}else if(CurrentSpeed < LimiteSpeed + 10)
				{
					CurrentBlood = CurrentBlood - FullBlood / 2;
				}else{
					CurrentBlood = CurrentBlood - FullBlood;
				}
			}
			if(CurrentBlood <= 0)
			{
				CurrentBlood = 0;
				document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
				document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
				document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
				document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
			}
			document.getElementById("CurrentBlood").innerHTML = CurrentBlood;
			Blood = CurrentBlood;
		},time);
		var stopSmall = setInterval(function(){
			if(Blood == 0)
			{
				clearInterval(autoSmall);
			}
		},100);
		setTimeout(function(){
			clearInterval(autoSmall);
			clearInterval(stopSmall);
		},time1);
	}
}

//自动发射大弹丸
function autoBig()
{
	var frequency = document.getElementById("frequency2").value;
	var time2 = 1000 * document.getElementById("time2").value;
	if(frequency == '' || frequency == undefined || frequency == null || time2 == '' || time2 == undefined || time2 == null)
	{
		alert("有一处或多处输入为空");
	}else{
		time2 = 1000 * time2;
		var time = 1000 / frequency;
		var Blood;
		var autoBig = setInterval(function(){
			var CurrentHeat1 = document.getElementById("CurrentHeat1").innerHTML;
			var CurrentBlood = parseInt(document.getElementById("CurrentBlood").innerHTML);
			CurrentHeat1 = parseInt(CurrentHeat1);
			CurrentHeat1 = CurrentHeat1 + 1600;
			document.getElementById("CurrentHeat1").innerHTML = CurrentHeat1;
			//射速扣血
			var CurrentSpeed = document.getElementById("Speed4").value;
			var LimiteSpeed = parseInt(document.getElementById("LimiteSpeed1").innerHTML);
			if(CurrentSpeed > LimiteSpeed)
			{
				if(CurrentSpeed <= LimiteSpeed * 1.1)
				{
					CurrentBlood = CurrentBlood - FullBlood / 50;
				}else if(CurrentSpeed <= LimiteSpeed * 1.2)
				{
					CurrentBlood = CurrentBlood - FullBlood / 20;
				}else{
					CurrentBlood = CurrentBlood - FullBlood / 10;
				}
			}
			if(CurrentBlood <= 0)
			{
				CurrentBlood = 0;
				document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
				document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射小弹丸</button>';
				document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
				document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
			}
			document.getElementById("CurrentBlood").innerHTML = CurrentBlood;
			Blood = CurrentBlood;
		},time);
		var stopBig = setInterval(function(){
			if(Blood == 0)
			{
				clearInterval(autoBig);
			}
		},100);
		setTimeout(function(){
			clearInterval(autoBig);
			clearInterval(stopBig);
		},time2);
	}
}


//*******************************************************************选择兵种****************************************************************
//选择步兵车
function infantry()
{
	document.getElementById("CurrentKind").innerHTML = "步兵";
	document.getElementById("CurrentLevel").innerHTML = 1;
	document.getElementById("LimiteHeat").innerHTML = 1600;
	document.getElementById("CoolPerMi").innerHTML = 500;
	document.getElementById("CurrentBlood").innerHTML = 750;
	document.getElementById("CurrentHeat").innerHTML = 0;
	document.getElementById("LimiteHeat1").innerHTML = 0;
	document.getElementById("CoolPerMi1").innerHTML = 0;
	document.getElementById("CurrentHeat1").innerHTML = 0;
	document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
	document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
	document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
	document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
	document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
	type = "infantry";
	FullBlood = 750;
}

//选择哨兵车
function centry()
{
	document.getElementById("CurrentKind").innerHTML = "哨兵";
	document.getElementById("CurrentLevel").innerHTML = "无等级";
	document.getElementById("LimiteHeat").innerHTML = 4500;
	document.getElementById("CoolPerMi").innerHTML = 1500;
	document.getElementById("CurrentBlood").innerHTML = 3000;
	document.getElementById("CurrentHeat").innerHTML = 0;
	document.getElementById("LimiteHeat1").innerHTML = 0;
	document.getElementById("CoolPerMi1").innerHTML = 0;
	document.getElementById("CurrentHeat1").innerHTML = 0;
	document.getElementById("button1").innerHTML = '<button class="btn btn-info" disabled="disabled">一级</button>';
	document.getElementById("button2").innerHTML = '<button class="btn btn-info" disabled="disabled">二级</button>';
	document.getElementById("button3").innerHTML = '<button class="btn btn-info" disabled="disabled">三级</button>';
	document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
	document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
	document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
	type = "centry";
	FullBlood = 3000;
}

//选择英雄车
function hero()
{
	document.getElementById("CurrentKind").innerHTML = "英雄";
	document.getElementById("CurrentLevel").innerHTML = "1";
	document.getElementById("LimiteHeat").innerHTML = 1600;
	document.getElementById("CoolPerMi").innerHTML = 500;
	document.getElementById("LimiteHeat1").innerHTML = 3200;
	document.getElementById("CoolPerMi1").innerHTML = 1600;
	document.getElementById("CurrentBlood").innerHTML = 1500;
	document.getElementById("CurrentHeat").innerHTML = 0;
	document.getElementById("CurrentHeat1").innerHTML = 0;
	document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
	document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
	document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
	document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" onclick="ManBig()">发射大弹丸</button>';
	document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" onclick="autoBig()">发射大弹丸</button>';
	document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
	document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
	type = "hero";
	FullBlood = 1500;
}

//*********************************************************************不同等级的初始值**************************************************************************
//一级
function OneLevel()
{
	if(type == "infantry")
	{
		document.getElementById("CurrentKind").innerHTML = "步兵";
		document.getElementById("CurrentLevel").innerHTML = 1;
		document.getElementById("LimiteHeat").innerHTML = 1600;
		document.getElementById("CoolPerMi").innerHTML = 500;
		document.getElementById("CurrentBlood").innerHTML = 750;
		document.getElementById("CurrentHeat").innerHTML = 0;
		document.getElementById("LimiteHeat1").innerHTML = 0;
		document.getElementById("CoolPerMi1").innerHTML = 0;
		document.getElementById("CurrentHeat1").innerHTML = 0;
		document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
		document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
		document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
		FullBlood = 750;
	}else if(type == "hero")
	{
		document.getElementById("CurrentKind").innerHTML = "英雄";
		document.getElementById("CurrentLevel").innerHTML = 1;
		document.getElementById("LimiteHeat").innerHTML = 1600;
		document.getElementById("CoolPerMi").innerHTML = 500;
		document.getElementById("LimiteHeat1").innerHTML = 3200;
		document.getElementById("CoolPerMi1").innerHTML = 1600;
		document.getElementById("CurrentBlood").innerHTML = 1500;
		document.getElementById("CurrentHeat").innerHTML = 0;
		document.getElementById("CurrentHeat1").innerHTML = 0;
		document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
		document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
		document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" onclick="ManBig()">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" onclick="autoBig()">发射大弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
		FullBlood = 1500;
	}
}

//二级
function TwoLevel()
{
	if(type == "infantry")
	{
		document.getElementById("CurrentKind").innerHTML = "步兵";
		document.getElementById("CurrentLevel").innerHTML = 2;
		document.getElementById("LimiteHeat").innerHTML = 3000;
		document.getElementById("CoolPerMi").innerHTML = 1000;
		document.getElementById("CurrentBlood").innerHTML = 1000;
		document.getElementById("CurrentHeat").innerHTML = 0;
		document.getElementById("LimiteHeat1").innerHTML = 0;
		document.getElementById("CoolPerMi1").innerHTML = 0;
		document.getElementById("CurrentHeat1").innerHTML = 0;
		document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
		document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
		document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
		FullBlood = 1000;
	}else if(type == "hero")
	{
		document.getElementById("CurrentKind").innerHTML = "英雄";
		document.getElementById("CurrentLevel").innerHTML = 2;
		document.getElementById("LimiteHeat").innerHTML = 3000;
		document.getElementById("CoolPerMi").innerHTML = 1000;
		document.getElementById("CurrentBlood").innerHTML = 2500;
		document.getElementById("CurrentHeat").innerHTML = 0;
		document.getElementById("LimiteHeat1").innerHTML = 6400;
		document.getElementById("CoolPerMi1").innerHTML = 3200;
		document.getElementById("CurrentHeat1").innerHTML = 0;
		document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
		document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
		document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" onclick="ManBig()">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" onclick="autoBig()">发射大弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
		FullBlood = 2500;
	}
}

//三级
function ThreeLevel()
{
	if(type == "infantry")
	{
		document.getElementById("CurrentKind").innerHTML = "步兵";
		document.getElementById("CurrentLevel").innerHTML = 3;
		document.getElementById("LimiteHeat").innerHTML = 6000;
		document.getElementById("CoolPerMi").innerHTML = 2000;
		document.getElementById("CurrentBlood").innerHTML = 1500;
		document.getElementById("CurrentHeat").innerHTML = 0;
		document.getElementById("LimiteHeat1").innerHTML = 0;
		document.getElementById("CurrentHeat1").innerHTML = 0;
		document.getElementById("CoolPerMi1").innerHTML = 0;
		document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
		document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
		document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" disabled="disabled">发射大弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
		FullBlood = 1500;
	}else if(type == "hero")
	{
		document.getElementById("CurrentKind").innerHTML = "英雄";
		document.getElementById("CurrentLevel").innerHTML = 3;
		document.getElementById("LimiteHeat").innerHTML = 6000;
		document.getElementById("CoolPerMi").innerHTML = 2000;
		document.getElementById("CurrentBlood").innerHTML = 3500;
		document.getElementById("CurrentHeat").innerHTML = 0;
		document.getElementById("LimiteHeat1").innerHTML = 12800;
		document.getElementById("CoolPerMi1").innerHTML = 6400;
		document.getElementById("CurrentHeat1").innerHTML = 0;
		document.getElementById("button1").innerHTML = '<button class="btn btn-info" onclick="OneLevel()">一级</button>';
		document.getElementById("button2").innerHTML = '<button class="btn btn-info" onclick="TwoLevel()">二级</button>';
		document.getElementById("button3").innerHTML = '<button class="btn btn-info" onclick="ThreeLevel()">三级</button>';
		document.getElementById("BigBullet1").innerHTML = '<button class="btn btn-info" onclick="ManBig()">发射大弹丸</button>';
		document.getElementById("BigBullet2").innerHTML = '<button class="btn btn-info" onclick="autoBig()">发射大弹丸</button>';
		document.getElementById("SmallBullet1").innerHTML = '<button class="btn btn-info" onclick="ManSmall()">发射小弹丸</button>';
		document.getElementById("SmallBullet2").innerHTML = '<button class="btn btn-info" onclick="autoSmall()">发射小弹丸</button>';
		FullBlood = 3500;
	}
}

window.onload = function load()
{
	Init();
	setInterval(HeatRecover,100);
	setInterval(LoseBlood,100);
}