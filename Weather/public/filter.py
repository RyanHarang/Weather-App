with open("cities15000.txt", "r") as file:
    lines = file.readlines()

filtered_lines = [line for line in lines if int(line.split("\t")[14]) >= 50000]

with open("filtered_cities.txt", "w") as file:
    file.writelines(filtered_lines)