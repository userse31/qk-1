CC=gcc
Z80AS=z80asm

all:
	$(CC) bintojs.c -o bintojs
	$(Z80AS) -i ./baserom.z80 -o baserom.bin
	cat baserom.bin | ./bintojs rom > rom.js
	cat numattack.bin | ./bintojs numattack >> rom.js
clean:
	- rm bintojs
	- rm baserom.bin
