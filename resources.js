const BASE_ROM_BEGIN=0x0000;
const BASE_ROM_END=0x0fff;
const CART_BEGIN=0x1000;
const CART_END=0x1fff;
const BASE_RAM_BEGIN=0x2000;
const BASE_RAM_END=0x3fff;
const KEYPAD_PORT=0x00;
const SCREEN1_PORT=0x01;
const SCREEN2_PORT=0x02;
const SCREEN3_PORT=0x03;
const SCREEN4_PORT=0x04;
const SCREEN5_PORT=0x05;
const SCREEN6_PORT=0x06;
const SCREEN7_PORT=0x07;
const SCREEN8_PORT=0x08;

var writable_cart=false;

var base_rom=new Uint8Array(0x1000);
base_rom.fill(0x00);
var cart=new Uint8Array(0x1000);
cart.fill(0x00);
var base_ram=new Uint8Array(0x2000);
base_rom.fill(0x00);
var keys=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],];
/*
in a,($01)
ld a,%01010101
out ($01),a
ld a,$69
nop
*/
//var rom="DB01DB02DB03DB04DB05DB06DB07DB08";
var j=0;
/*for(var i=0;i<rom.length;i+=2){
	base_rom[j]=eval("0x"+rom[i]+rom[i+1]);
	j++;
}*/
for(var i=0;i<rom.length;i++){
	base_rom[i]=rom[i];
}
j=0;
/*for(var i=0;i<numattack.length;i+=2){
	cart[j]=eval("0x"+numattack[i]+numattack[i+1]);
	j++;
}*/
var qk1_core={
	mem_read:function(addr){
		if(addr>=BASE_ROM_BEGIN && addr<=BASE_ROM_END){
			return base_rom[addr];
		}
		if(addr>=BASE_RAM_BEGIN && addr<=BASE_RAM_END){
			return base_ram[addr-BASE_RAM_BEGIN];
		}
		if(addr>=CART_BEGIN && addr<=CART_END){
			return cart[addr-CART_BEGIN];
		}
		return 0;
	},
	mem_write:function(addr,val){
		if(addr>=BASE_ROM_BEGIN && addr<=BASE_ROM_END){
			0;
		}
		if(addr>=BASE_RAM_BEGIN && addr<=BASE_RAM_END){
			base_ram[addr-BASE_RAM_BEGIN]=val;
		}
		if(addr>=CART_BEGIN && addr<=CART_END && writable_cart){
			cart[addr-CART_BEGIN]=val;
		}	
	},
	io_read:function(port){
		switch(port){
			case 0x00://keypad
				return get_keypad_states();
				break;
			case 0x01://digit 1
				draw_digit(1,0b00000000);
				break;
			case 0x02://digit 2
				draw_digit(2,0b00000000);
				break;
			case 0x03://digit 3
				draw_digit(3,0b00000000);
				break;
			case 0x04://digit 4
				draw_digit(4,0b00000000);
				break;
			case 0x05://digit 5
				draw_digit(5,0b00000000);
				break;
			case 0x06://digit 6
				draw_digit(6,0b00000000);
				break;
			case 0x07://digit 7
				draw_digit(7,0b00000000);
				break;
			case 0x08://digit 8
				draw_digit(8,0b00000000);
				break;
		}
		return 0x00;
	},
	io_write:function(port,value){
		switch(port&0b0000000011111111){
			case 0x00://keypad
				set_keypad_selection(value);
				break;
			case 0x01://digit 1
				//document.getElementById("a").textContent=value;
				draw_digit(1,value);
				break;
			case 0x02://digit 2
				draw_digit(2,value);
				break;
			case 0x03://digit 3
				draw_digit(3,value);
				break;
			case 0x04://digit 4
				draw_digit(4,value);
				break;
			case 0x05://digit 5
				draw_digit(5,value);
				break;
			case 0x06://digit 6
				draw_digit(6,value);
				break;
			case 0x07://digit 7
				draw_digit(7,value);
				break;
			case 0x08://digit 8
				draw_digit(8,value);
				break;
			case 0x09://test
				alert("Port upper:"+(port>>8)+" Port lower:"+(port&0b0000000011111111)+" Value:"+value);
				break;
		}
		return 0x00;
	},
};
//oh boy do i _hate_ that!
var qk1=Z80(qk1_core);
//alert(1);
