"""Génère docs/veille-sources.xlsx à partir de content.json (clé veille).
Usage : python3 scripts/veille_xlsx.py   (depuis la racine du dépôt)"""
import json, datetime
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.formatting.rule import DataBarRule, FormulaRule
from openpyxl.worksheet.datavalidation import DataValidation

V = json.load(open("content.json", encoding="utf-8"))["veille"]
SEUIL = V.get("threshold", 20)
NAVY, GRID = "0B1F3A", "D5DCE6"
F = lambda **k: Font(name="Arial", **k)
thin = Side(style="thin", color=GRID); B = Border(left=thin, right=thin, top=thin, bottom=thin)
arts = sorted(V.get("articles", []), key=lambda a: a.get("iso", ""), reverse=True)
FIRST = 5; LAST = FIRST + max(40, len(arts) + 15) - 1

wb = Workbook(); ws = wb.active; ws.title = "Sources"; ws.sheet_view.showGridLines = False
for c, w in {"A": 11, "B": 46, "C": 24, "D": 22, "E": 13, "F": 34, "G": 22, "H": 13, "I": 17}.items(): ws.column_dimensions[c].width = w
ws.merge_cells("A1:I1"); ws["A1"] = "TABLEAU D'ANALYSE DES SOURCES — VEILLE INFORMATIONNELLE"
ws["A1"].font = F(bold=True, size=18, color="FFFFFF"); ws["A1"].fill = PatternFill("solid", fgColor=NAVY); ws["A1"].alignment = Alignment(horizontal="center", vertical="center"); ws.row_dimensions[1].height = 46
ws.merge_cells("A2:I2"); ws["A2"] = f"Renseignez les colonnes B à G et donnez une note sur 40 (colonne H) : la recommandation se calcule automatiquement. Seuls les articles à plus de {SEUIL}/40 sont retenus sur le portfolio. Cliquez sur le site (colonne D) pour ouvrir la source."
ws["A2"].font = F(italic=True, size=10, color="5B6B80"); ws["A2"].alignment = Alignment(horizontal="center", vertical="center", wrap_text=True); ws.row_dimensions[2].height = 30
heads = ["N° annexe", "Titre de l'annexe", "Auteur", "Ouvrage ou site", "Date de parution", "Mots clés", "Type de veille", "Note /40", "Recommandation"]
for i, hv in enumerate(heads):
    c = ws.cell(row=4, column=i + 1, value=hv); c.border = B; c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    c.font = F(bold=True, size=11, color="FFFFFF"); c.fill = PatternFill("solid", fgColor=NAVY)
ws.row_dimensions[4].height = 34
for r in range(FIRST, LAST + 1):
    ws.row_dimensions[r].height = 34
    for col in "ABCDEFGHI":
        c = ws[f"{col}{r}"]; c.border = B; c.font = F(size=10); c.alignment = Alignment(vertical="center", wrap_text=True, horizontal="center" if col in "AEHI" else "left")
    ws[f"E{r}"].number_format = "DD/MM/YYYY"
    ws[f"I{r}"] = f'=IF(H{r}="","",IF(H{r}>=30,"Retenir",IF(H{r}>{SEUIL},"À vérifier","À écarter")))'
    ws[f"H{r}"].font = F(size=11, bold=True); ws[f"I{r}"].font = F(size=11, bold=True)
for i, a in enumerate(arts):
    r = FIRST + i
    ws[f"A{r}"] = i + 1; ws[f"B{r}"] = a.get("title"); ws[f"C{r}"] = a.get("author") or a.get("source"); ws[f"D{r}"] = a.get("site") or a.get("source")
    if a.get("iso"): ws[f"E{r}"] = datetime.date.fromisoformat(a["iso"])
    ws[f"F{r}"] = a.get("keywords"); ws[f"G{r}"] = a.get("type") or a.get("cat")
    if isinstance(a.get("note"), (int, float)): ws[f"H{r}"] = a["note"]
    if a.get("url"): ws[f"D{r}"].hyperlink = a["url"]; ws[f"D{r}"].font = F(size=10, color="1F5FAD", underline="single")
ws.conditional_formatting.add(f"H{FIRST}:H{LAST}", DataBarRule(start_type="num", start_value=0, end_type="num", end_value=40, color="22C3D6"))
for txt, bg, fg in [("Retenir", "E6F4EA", "1E7D32"), ("À vérifier", "FFF4E0", "B26A00"), ("À écarter", "FDE8E8", "C62828")]:
    ws.conditional_formatting.add(f"I{FIRST}:I{LAST}", FormulaRule(formula=[f'I{FIRST}="{txt}"'], fill=PatternFill("solid", fgColor=bg), font=Font(name="Arial", bold=True, color=fg)))
dv = DataValidation(type="whole", operator="between", formula1="0", formula2="40", showErrorMessage=True, errorTitle="Note invalide", error="Saisis une note entière de 0 à 40.")
ws.add_data_validation(dv); dv.add(f"H{FIRST}:H{LAST}")
dv2 = DataValidation(type="list", formula1='"Cybersécurité,Technologique,Juridique / réglementaire,Cloud,Infrastructure,Réseaux"', allow_blank=True)
ws.add_data_validation(dv2); dv2.add(f"G{FIRST}:G{LAST}")
ws.auto_filter.ref = f"A4:I{LAST}"; ws.freeze_panes = "A5"
ws.print_title_rows = "4:4"; ws.page_setup.orientation = "landscape"; ws.page_setup.fitToWidth = 1; ws.page_setup.fitToHeight = 0; ws.sheet_properties.pageSetUpPr.fitToPage = True
g = wb.create_sheet("Grille de notation"); g.sheet_view.showGridLines = False
g.column_dimensions["A"].width = 26; g.column_dimensions["B"].width = 90
g["A1"] = "Grille de notation des sources"; g["A1"].font = F(bold=True, size=14, color=NAVY)
lines = [("Note sur 40", "Une seule note par article, de 0 à 40. Elle tient compte de la pertinence pour le sujet, de la date de publication et de la fiabilité de l'auteur."),
 ("Repères", "35-40 : source officielle, récente et au cœur du sujet · 25-34 : bonne source, utile · 21-24 : utile mais avec des limites · 20 ou moins : source faible, ancienne ou hors sujet."),
 ("Recommandation", f"Retenir : 30/40 ou plus · À vérifier : plus de {SEUIL}/40 · À écarter : {SEUIL}/40 ou moins. Seuls les articles à plus de {SEUIL}/40 sont retenus sur le portfolio."),
 ("À remplir", "Colonnes B à G et la note en colonne H. Ne touche pas à la colonne I (formule)."),
 ("Mise à jour", f"Fichier régénéré automatiquement à partir des notes du portfolio (content.json), le {datetime.date.today().strftime('%d/%m/%Y')}.")]
for i, (a, b) in enumerate(lines):
    r = 3 + i; g[f"A{r}"] = a; g[f"B{r}"] = b; g[f"A{r}"].font = F(bold=True, size=10, color=NAVY); g[f"B{r}"].font = F(size=10)
    g[f"B{r}"].alignment = Alignment(wrap_text=True, vertical="top"); g[f"A{r}"].alignment = Alignment(vertical="top", wrap_text=True); g.row_dimensions[r].height = 32
wb.save("docs/veille-sources.xlsx"); print(f"docs/veille-sources.xlsx : {len(arts)} articles")
