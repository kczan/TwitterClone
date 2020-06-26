# Read inputs from Standard Input.
# Write outputs to Standard Output.


# I have chosen Python language.


import sys

times_list = []
n = int(input())
for i in range(n):
  times_list.append(input())

times_list.sort()
# for time in times_list:



print(times_list[0])