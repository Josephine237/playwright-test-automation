# Testy pro nové objednávky

---

## Zadání

Vytvoř sadu automatizovaných testů pomocí Playwright, které pokryjí následující funkcionalitu aplikace.
Testy by měly pokrývat:

### 1. Objednávka pro MŠ/ZŠ
   - Navigace:
     - Ověř, že aplikace umožňuje uživateli v menu Pro učitele přístup k vytvoření nové objednávky pro MŠ/ZŠ.
   - Vytvoření objednávky:
     - Ověř, že aplikace umožňuje vytvořit novou objednávku pro MŠ/ZŠ.
     - Po zadání IČO do formuláře Objednávka pro MŠ/ZŠ:
       - Ověř, že se automaticky načte jméno odběratele a adresa odběratele z ARESu.
   - Uživatel:
     - Nemůže uložit neúplnou přihlášku (ověř validaci povinných polí).
     - Může uložit kompletně vyplněnou přihlášku na příměstský tábor.
     - Po úspěšném uložení:
       - Ověř, že se zobrazí potvrzení o uložení.
       - Ověř, že se objednávka zobrazí v seznamu objednávek.
### 2. Administrátor
   - Ověř, že administrátor má možnost smazat objednávku.

---

## Požadavky na testy:
 - Použij vhodné **assertace** k ověření funkcionality.
 - Testy musí být nezávislé na sobě – jednotlivé testy by měly být spustitelné v libovolném pořadí.
 - Dodržuj osvědčené postupy pro psaní udržovatelných a přehledných testů.

Pokud máš nějaké otázky k zadání, neváhej se zeptat! 😊
