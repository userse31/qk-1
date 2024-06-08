all:
	gcc bintojs.c -o bintojs
	z80asm -i ./baserom.z80 -o baserom.bin
	cat baserom.bin | ./bintojs rom > rom.js
	cat numattack.bin | ./bintojs numattack >> rom.js
clean:
	- rm bintojs
	- rm baserom.bin
