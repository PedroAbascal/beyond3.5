import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace("let firstAtk = babArray[0] + atkMod;", "let firstAtk = babArray[0] + atkMod + (window.combatCondAtkPen || 0);")
app = app.replace("let totalAtk = bab + atkMod;", "let totalAtk = bab + atkMod + (window.combatCondAtkPen || 0);")
app = app.replace("let firstAtk = mBabArray[0];", "let firstAtk = mBabArray[0] + (window.combatCondAtkPen || 0);")
app = app.replace("let atkStr = bab >= 0 ? '+' + bab : '' + bab;", "let tBab = bab + (window.combatCondAtkPen || 0); let atkStr = tBab >= 0 ? '+' + tBab : '' + tBab;")

app = app.replace("let speed = document.getElementById('combat-speed')?.value || '30 pies';", "let speed = document.getElementById('combat-speed')?.value || '30 pies'; if (window.isEncumbered) { speed = speed.replace('30', '20').replace('40', '30'); }")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
