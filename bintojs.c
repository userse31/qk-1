#include <stdio.h>
#include <stdlib.h>

unsigned char *buffer;

int main(int argc, char *argv[]){
	buffer=malloc(sizeof(unsigned char)*1);
	if(argc<2){
	printf("const INSERT_NAME_HERE=[");
	}else{
	printf("const %s=[",argv[1]);
	}
	while(fread(buffer,sizeof(unsigned char),1,stdin)!=0){
		printf("0x%02x,",buffer[0]);
	}
	printf("0x00];\n");
}
