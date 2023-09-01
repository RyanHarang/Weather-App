# Must bring file in to be filtered and set name accordingly
with open("cities15000.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()
# Choose a population number to be the minimum for a city to be displayed
filtered_lines = [line for line in lines if int(line.split("\t")[14]) >= 85000]

with open("filtered_cities.txt", "w", encoding="utf-8") as file:
    file.writelines(filtered_lines)