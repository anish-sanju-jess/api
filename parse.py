f = open("./f.txt", encoding = "utf-8").read().split("\n")
for i in range(len(f)):
    f[i] = f[i].replace("“", "")
    f[i] = f[i].replace("”", "")
    f[i] = f[i].replace("’", "'")
print(f)
