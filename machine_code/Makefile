DEVICE=W27C512@DIP28
TARGET=qk-1_monitor

all:
	z80asm -v $(TARGET).z80 -o $(TARGET).bin

flash:
	minipro --device $(DEVICE) -w $(TARGET).bin -s

clean:
	rm ./*.bin
