with open("cities15000.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

filtered_lines = [line for line in lines if int(line.split("\t")[14]) >= 85000]

with open("filtered_cities.txt", "w", encoding="utf-8") as file:
    file.writelines(filtered_lines)