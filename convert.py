import csv
from io import StringIO

# Simulate a csv data file with no header
data = StringIO('''\
Mark,44,1
Joe,22,0
Craig,39,3
''')

# 1. Read in all the data
# 2. Transpose into columns
# 3. Match with column names
# 4. Create dictionary
cols = dict(zip('Name Age Children'.split(),zip(*csv.reader(data))))
print(cols)
