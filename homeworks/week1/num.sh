# !/bin/bash
# Auther: 
# 	Wendy
# Date:
# 	2021/04/16

read -p "How many .js you want to build?" number

for i in $(seq 1 $number); 
do
	touch "$i.js";
done
echo "all done~"
