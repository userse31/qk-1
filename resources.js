//Memory Space
const BASE_ROM_BEGIN=0x0000;
const BASE_ROM_END=0x1fff;
const CART_ROM_BEGIN=0x2000;
const CART_ROM_END=0x3fff;
const CART_RAM_BEGIN=0xC000;
const CART_RAM_END=0xDFFF;
const BASE_RAM_BEGIN=0xE000;
const BASE_RAM_END=0xFFFF;

//IO Space
const SCREEN1_PORT=0x00;
const SCREEN2_PORT=0x01;
const SCREEN3_PORT=0x02;
const SCREEN4_PORT=0x03;
const SCREEN5_PORT=0x04;
const SCREEN6_PORT=0x05;
const SCREEN7_PORT=0x06;
const SCREEN8_PORT=0x07;
const KEYPAD_COL0=0x08;
const KEYPAD_COL1=0x09;
const KEYPAD_COL2=0x0A;
const KEYPAD_COL3=0x0B;
const PIEZO_BUZZER=0x0C;
const GPOUT0=0x0D;
const GPOUT1=0x0E;
const GPOUT2=0x0F;

var writable_cart=false;

var base_rom=new Uint8Array(0x2000);
base_rom.fill(0x00);
var cart_rom=new Uint8Array(0x2000);
cart_rom.fill(0x00);
var cart_ram=new Uint8Array(0x2000);
cart_rom.fill(0x00);
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
for(var i=0;i<rom.length;i++){
	base_rom[i]=rom[i];
}
j=0;
var qk1_core={
	mem_read:function(addr){
		if(addr>=BASE_ROM_BEGIN && addr<=BASE_ROM_END){
			return base_rom[addr];
		}
		if(addr>=BASE_RAM_BEGIN && addr<=BASE_RAM_END){
			return base_ram[addr-BASE_RAM_BEGIN];
		}
		if(addr>=CART_ROM_BEGIN && addr<=CART_ROM_END){
			return cart_rom[addr-CART_ROM_BEGIN];
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
		if(addr>=CART_ROM_BEGIN && addr<=CART_ROM_END && writable_cart){
			cart_rom[addr-CART_BEGIN]=val;
		}	
	},
	io_read:function(port){
		var ret_val;
		var top_half=(port&0b1111111100000000)>>8;
		var bottom_half=port&0b0000000011111111;
		switch(bottom_half){
			case KEYPAD_COL0:
				ret_val=0b00000000;
				ret_val|=keys[5][0]<<5;
				ret_val|=keys[4][0]<<4;
				ret_val|=keys[3][0]<<3;
				ret_val|=keys[2][0]<<2;
				ret_val|=keys[1][0]<<1;
				ret_val|=keys[0][0]<<0;
				ret_val=~ret_val;
				break;
			case KEYPAD_COL1:
				ret_val=0b00000000;
				ret_val|=keys[5][1]<<5;
				ret_val|=keys[4][1]<<4;
				ret_val|=keys[3][1]<<3;
				ret_val|=keys[2][1]<<2;
				ret_val|=keys[1][1]<<1;
				ret_val|=keys[0][1]<<0;
				ret_val=~ret_val;
				break;
			case KEYPAD_COL2:
				ret_val=0b00000000;
				ret_val|=keys[5][2]<<5;
				ret_val|=keys[4][2]<<4;
				ret_val|=keys[3][2]<<3;
				ret_val|=keys[2][2]<<2;
				ret_val|=keys[1][2]<<1;
				ret_val|=keys[0][2]<<0;
				ret_val=~ret_val;
				break;
			case KEYPAD_COL3:
				ret_val=0b00000000;
				ret_val|=keys[5][3]<<5;
				ret_val|=keys[4][3]<<4;
				ret_val|=keys[3][3]<<3;
				ret_val|=keys[2][3]<<2;
				ret_val|=keys[1][3]<<1;
				ret_val|=keys[0][3]<<0;
				ret_val=~ret_val;
				break;
			case PIEZO_BUZZER:
				break;
			case GPOUT0:
				break;
			case GPOUT1:
				break;
			case GPOUT2:
				break;
			default:
				return 0xFF;
		}
		return ret_val;
	},
	io_write:function(port,value){
		var top_half=(port&0b1111111100000000)>>8;
		switch(port&0b0000000011111111){
			case SCREEN1_PORT://digit 1
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(1,top_half);
				break;
			case SCREEN2_PORT://digit 2
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(2,top_half);
				break;
			case SCREEN3_PORT://digit 3
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(3,top_half);
				break;
			case SCREEN4_PORT://digit 4
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(4,top_half);
				break;
			case SCREEN5_PORT://digit 5
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(5,top_half);
				break;
			case SCREEN6_PORT://digit 6
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(6,top_half);
				break;
			case SCREEN7_PORT://digit 7
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(7,top_half);
				break;
			case SCREEN8_PORT://digit 8
				tick_count%CLEAR_DISP_THRESHOLD2?0:clear_display();
				draw_digit(8,top_half);
				break;
			case KEYPAD_COL0:
				break;
			case KEYPAD_COL1:
				break;
			case KEYPAD_COL2:
				break;
			case KEYPAD_COL3:
				break;
			case PIEZO_BUZZER:
				break;
			case GPOUT0:
				break;
			case GPOUT1:
				break;
			case GPOUT2:
				break;
			default:
				return 0xFF;
		}
	},
};
var qk1=Z80(qk1_core);
//alert(1);
