#####################################################
### This file is an example MIPS program for CE12 ###
#####################################################

# This file has three example subroutines:
#	1. a subroutine to enable LED5
#	2. a subroutine to turn on LED5
#	3. a subroutine to turn off LED5 

# In myprog, first the enable subroutine is called to make LED5 an output
# then, a loop is initiated where we turn the LED on by calling a subroutine,
# then we print a message to the terminal, then we turn the LED off.
# But, the loop happens so quickly, we don't see it blinking! Thats why we 
# need to create a mydelay subroutine.


# This puts the symbol myprog into the symbol table 
.global myprog

# This specifies the instruction part of your program	
.text

# This prevents the assembler from reordering the instructions
.set noreorder

# This specifies where the entry to myprog starts
.ent myprog 

# This is the label of the address for myprog
myprog:
	lw		$t0, constant
	jal 	EnableSwitch# jump to subroutine to enable Switches
	nop								
	
	jal 	EnableLED	# jump to subroutine to enable LED 5 
	nop
	
	la		$a0,Serial
	la		$a1,greeting
	jal     _ZN5Print7printlnEPKc     
	nop

# Start a loop that will always repeat
loop:
	
	lw		$s1, PORTD 	# load word contents of POTD into s1 
	nop					# s1 will have its bit 8 and/or 9 on or off

	
	
	#first for mask to correctly work
	lw		$t3, sthree	# t3 = 0000 0011 0000 0000
	and		$t4,$s1,$t3	# mask s1 with t3 to see if bits 8,9 = 1  
	beq		$t4, $t3, pThree 	# if t4 = t3 (0000 0011 0000 0000) go to 
	nop
	
	
	lw		$t3, sone	# t3 = 0000 0001 0000 0000
	beq		$t4, $t3, pOne	# if t4 > 0, bit 8 = 1, go to label Sw1
	nop
	
	
	lw		$t3, stwo	# t3 = 0000 0010 0000 0000
	and		$t4,$s1,$t3	# mask s1 with t3 to see if bit 9 = 1 
	beq		$t4, $t3, pTwo	# if t4 > 0, bit 9 = 1, go to label Sw2
	nop
	

	lw		$t5, low
	jal		default
	nop
	

	
# always jump back to the start of the program
	j      loop
	nop
	





################
pOne:
	lw		$t5, turnup
	
	

	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	srl	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	srl	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	srl	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	srl	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	srl	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	srl	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	srl	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	
	


	jal		 pOneFlash
	nop

	
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	sll	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	sll	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	sll	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	sll	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	sll	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	sll	 	$t4, $t4, 1
	sw		$t4, bitSnake
	
	jal		 pOneFlash
	nop
	lw 		$t4, bitSnake
	sll	 	$t4, $t4, 1
	sw		$t4, bitSnake



	
	jal		 pOneFlash
	nop


	j loop
	nop
	
	
######### modified version of default#######
pOneFlash:


	addi	$t6,$ra, 0
	jal		LED1on		# turn off led
	nop
	jal		mydelay
	nop
	jal		LED1off		# turn off led
	nop
	jal		mydelay
	nop	

	addi	$ra, $t6, 0
	jr		$ra
	nop

	
	
	
	

	
	
	
	##############################
pTwo:
	lw		$t5, turnup
	

	lw		$t9,  bitV1
	sw		$t9,  bitVU

	jal		 pTwoFlash
	nop
	
	
	
	lw		$t9,  bitV2
	sw		$t9,  bitVU

	jal		 pTwoFlash
	nop
	
	
	lw		$t9,  bitV3
	sw		$t9,  bitVU

	jal		 pTwoFlash
	nop
	
	
	lw		$t9,  bitV4
	sw		$t9,  bitVU

	jal		 pTwoFlash
	nop

	j loop
	nop


######### modified version of default#######
pTwoFlash:


	addi		$t6,$ra, 0
	jal		LED2on		# turn off led
	nop
	jal		mydelay
	nop
	jal		LED2off		# turn off led
	nop
	jal		mydelay
	nop	

	addi		$ra, $t6, 0
	jr		$ra
	nop
	
	
	
	
	

	###############################################
pThree:
	addi	$t6, $ra, 0
	lw		$t5, turnup
	
	jal		LED1altOn		# turn off led
	nop

	jal		mydelay
	nop
	
	jal		LED1altOff		# turn off led
	nop
	
	jal		mydelay
	nop
	
	
	jal		LED2altOn		# turn off led
	nop

	jal		mydelay
	nop
	
	jal		LED2altOff		# turn off led
	nop
	
	jal		mydelay
	nop



	j loop
	nop
	
	
	
###########################
# delay subroutine #
###########################
mydelay:
	li		$t1, 0    #used for increment i
	li		$t2, 0    #used for increment j

	mul	$t7, $t5, $t0
	
	
	
del1:
	sub	$t3,$t1, $t7
	bgez 	$t3, done	# check if i= 1000 then done

del2:
	sub	$t4,$t2, $t0
	bgez 	$t4, done2	# check if j< 1000
	
	
	
	addi 	$t2, $t2, 1		# increments "j"
	j  		del2
	nop

done2:	
	li		$t2, 0    #used to reset j
	addi 	$t1, $t1, 1		# increments "i"
	j		del1
	nop
	
done:
	jr	$ra
	nop
	
	
##########################
##    Default Patern   ##
default:
	

	addi		$t6, $ra, 0
	jal		LEDon		# turn off led
	nop

	jal		mydelay
	nop
	
	jal		LEDoff		# turn off led
	nop
	
	jal		mydelay
	nop

	addi		$ra, $t6, 0
	jr		$ra
	nop
	
	
	
###############################
## Subroutine to enable switches ##
EnableSwitch:
	li 		$t9, 0x0f00		# li = pseudo op to load an immediate value into a register, 1 => $t9 
	la 		$t8, TRISD	 	# load address of TRISF into $t8 
	sw 		$t9, 8($t8)			# store $t9 into address defined by $t8 plus an offset of 4
								# this clears TRISF, making LED5 an output
	jr 		$ra					# jr is the return instruction (like RET in LC3), 
								# $ra is the return address (like R7 in LC3)
	nop
	

	
	
	

## Subroutine to enable all LEDs ##

EnableLED:
	li 		$t9, 0x00ff		# loads value that enables all lights
	la 		$t8, TRISE	 		# load address of TRISF into $t8 
	sw 		$t9, 4($t8)			# store $t9 into address defined by $t8 plus an offset of 4
								# this clears TRISF, making LEDs an output
	jr 		$ra					# jr is the return instruction (like RET in LC3), 
								# $ra is the return address (like R7 in LC3)
	nop
	
	
	
	
	
LED1altOn:
	lw 		$t9, bitAlt1
	la 		$t8, PORTE			# load address of PORTF into $t8 
	sw 		$t9, 8($t8)			# store $t9 into PORTF with an offset of 8 to turn on LED
	jr		$ra
	nop


# turn off led for first pattern#	
LED1altOff:
	lw 		$t9, bitAlt1
	la 		$t8, PORTE
	sw 		$t9, 4($t8)			# store $t9 into PORTF with an offset of 4 to turn off LED	
	jr		$ra
	nop	
	
	
	
LED2altOn:
	lw 		$t9, bitAlt2
	la 		$t8, PORTE			# load address of PORTF into $t8 
	sw 		$t9, 8($t8)			# store $t9 into PORTF with an offset of 8 to turn on LED
	jr		$ra
	nop


# turn off led for first pattern#	
LED2altOff:
	lw 		$t9, bitAlt2
	la 		$t8, PORTE
	sw 		$t9, 4($t8)			# store $t9 into PORTF with an offset of 4 to turn off LED	
	jr		$ra
	nop	
	
	
	
	
	
	
	
	
#turn on led for first pattern#	
LED1on:
	lw 		$t9, bitSnake
	la 		$t8, PORTE			# load address of PORTF into $t8 
	sw 		$t9, 8($t8)			# store $t9 into PORTF with an offset of 8 to turn on LED
	jr		$ra
	nop


# turn off led for first pattern#	
LED1off:
	lw 		$t9, bitSnake
	la 		$t8, PORTE
	sw 		$t9, 4($t8)			# store $t9 into PORTF with an offset of 4 to turn off LED	
	jr		$ra
	nop		
	



#turn on led for first pattern#	
LED2on:
	lw 		$t9, bitVU
	la 		$t8, PORTE			# load address of PORTF into $t8 
	sw 		$t9, 8($t8)			# store $t9 into PORTF with an offset of 8 to turn on LED
	jr		$ra
	nop


# turn off led for first pattern#	
LED2off:
	lw 		$t9, bitVU
	la 		$t8, PORTE
	sw 		$t9, 4($t8)			# store $t9 into PORTF with an offset of 4 to turn off LED	
	jr		$ra
	nop		
	


	
# turn on leds subroutine #
LEDon:
	li 		$t9, 0x00ff
	la 		$t8, PORTE			# load address of PORTF into $t8 
	sw 		$t9, 8($t8)			# store $t9 into PORTF with an offset of 8 to turn on LED
	jr		$ra
	nop
	
	
	
# turn off leds subroutine #
LEDoff:
	li 		$t9, 0x00ff
	la 		$t8, PORTE
	sw 		$t9, 4($t8)			# store $t9 into PORTF with an offset of 4 to turn off LED	
	jr		$ra
	nop	

	
	
# end of progRAM
.end myprog 





# data part of the program
.data



bitAlt1:	.word	0b11001100
bitAlt2:	.word	0b00110011

bitSnake:	.word	0b10000000


bitVU:		.word	0
bitV1:		.word	0b11000011
bitV2:		.word	0b01100110
bitV3:		.word	0b00111100
bitV4:		.word	0b00011000

constant:	.word	1000
greetingT:	.word	112
low:		.word	16
med:		.word	8		
high:		.word	2
turnup:		.word	1


sone:		.word	256
stwo:		.word   512
sthree:		.word	768
test1:		.ascii  "ON\0"
test2:		.ascii	"OFF\0"	
test3:		.ascii	"BOTH\0"
greeting:	.ascii	"-----BLEEP------\0"

