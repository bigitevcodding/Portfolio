"""Génère docs/veille-sources.xlsx à partir de content.json (clé veille).
Usage : python3 scripts/veille_xlsx.py   (depuis la racine du dépôt)"""
import json, datetime
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.formatting.rule import DataBarRule, FormulaRule
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.comments import Comment

V = json.load(open("content.json", encoding="utf-8"))["veille"]
W = V.get("weights", {"pertinence": 3, "date": 4, "auteur": 3}); SEUIL = V.get("threshold", 20)
NAVY, BEIGE, GRID = "0B1F3A", "FDF1DC", "D5DCE6"
F = lambda **k: Font(name="Arial", **k)
thin = Side(style="thin", color=GRID); B = Border(left=thin, right=thin, top=thin, bottom=thin)
arts = sorted(V.get("articles", []), key=lambda a: a.get("iso", ""), reverse=True)
FIRST = 6; LAST = FIRST + max(40, len(arts) + 15) - 1

wb = Workbook(); ws = wb.active; ws.title = "Sources"; ws.sheet_view.showGridLines = False
for c, w in {"A": 11, "B": 46, "C": 24, "D": 22, "E": 13, "F": 34, "G": 22, "H": 12, "I": 12, "J": 12, "K": 13, "L": 17}.items(): ws.column_dimensions[c].width = w
ws.merge_cells("A1:L1"); ws["A1"] = "TABLEAU D'ANALYSE DES SOURCES — VEILLE INFORMATIONNELLE"
ws["A1"].font = F(bold=True, size=18, color="FFFFFF"); ws["A1"].fill = PatternFill("solid", fgColor=NAVY); ws["A1"].alignment = Alignment(horizontal="center", vertical="center"); ws.row_dimensions[1].height = 46
ws.merge_cells("A2:L2"); ws["A2"] = f"Renseignez les colonnes B à G et notez chaque critère de 1 à 4 (colonnes H-J) : le score total et la recommandation se calculent automatiquement. Seuls les articles à plus de {SEUIL}/40 sont publiés sur le portfolio. Cliquez sur le site (colonne D) pour ouvrir la source."
ws["A2"].font = F(italic=True, size=10, color="5B6B80"); ws["A2"].alignment = Alignment(horizontal="center", vertical="center", wrap_text=True); ws.row_dimensions[2].height = 30
ws.merge_cells("H3:J3"); ws["H3"] = "Critères notés de 1 (faible) à 4 (fort) — pondération éditable ci-dessous"
ws["H3"].font = F(bold=True, size=9, color="FFFFFF"); ws["H3"].fill = PatternFill("solid", fgColor=NAVY); ws["H3"].alignment = Alignment(horizontal="center", vertical="center", wrap_text=True); ws.row_dimensions[3].height = 30
for col, name in zip("HIJ", ["Pertinence", "Date / actualité", "Fiabilité de l'auteur"]):
    c = ws[f"{col}4"]; c.value = name; c.font = F(bold=True, size=9, color=NAVY); c.fill = PatternFill("solid", fgColor=BEIGE); c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True); c.border = B
ws.row_dimensions[4].height = 28
heads = ["N° annexe", "Titre de l'annexe", "Auteur", "Ouvrage ou site", "Date de parution", "Mots clés", "Type de veille", W["pertinence"], W["date"], W["auteur"], "Score total", "Recommandation"]
for i, hv in enumerate(heads):
    c = ws.cell(row=5, column=i + 1, value=hv); c.border = B; c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    if i in (7, 8, 9): c.font = F(bold=True, size=14, color=NAVY); c.fill = PatternFill("solid", fgColor=BEIGE)
    else: c.font = F(bold=True, size=11, color="FFFFFF"); c.fill = PatternFill("solid", fgColor=NAVY)
ws.row_dimensions[5].height = 34
for col, n in zip("HIJ", ["Pertinence", "Date / actualité", "Fiabilité de l'auteur"]): ws[f"{col}5"].comment = Comment(f"Poids du critère {n} (modifiable).", "Tévin")
MAX = "4*SUM($H$5:$J$5)"
for r in range(FIRST, LAST + 1):
    ws.row_dimensions[r].height = 34
    for col in "ABCDEFGHIJKL":
        c = ws[f"{col}{r}"]; c.border = B; c.font = F(size=10); c.alignment = Alignment(vertical="center", wrap_text=True, horizontal="center" if col in "AEHIJKL" else "left")
    ws[f"E{r}"].number_format = "DD/MM/YYYY"
    ws[f"K{r}"] = f'=IF(COUNT(H{r}:J{r})<3,"",H{r}*$H$5+I{r}*$I$5+J{r}*$J$5)'
    ws[f"L{r}"] = f'=IF(K{r}="","",IF(K{r}>=0.75*{MAX},"Retenir",IF(K{r}>{SEUIL}/40*{MAX},"À vérifier","À écarter")))'
    ws[f"K{r}"].font = F(size=11, bold=True); ws[f"L{r}"].font = F(size=11, bold=True)
for i, a in enumerate(arts):
    r = FIRST + i; n = a.get("notes") or {}
    ws[f"A{r}"] = i + 1; ws[f"B{r}"] = a.get("title"); ws[f"C{r}"] = a.get("author") or a.get("source"); ws[f"D{r}"] = a.get("site") or a.get("source")
    if a.get("iso"): ws[f"E{r}"] = datetime.date.fromisoformat(a["iso"])
    ws[f"F{r}"] = a.get("keywords"); ws[f"G{r}"] = a.get("type") or a.get("cat")
    for col, k in zip("HIJ", ["pertinence", "date", "auteur"]):
        if n.get(k): ws[f"{col}{r}"] = n[k]
    if a.get("url"): ws[f"D{r}"].hyperlink = a["url"]; ws[f"D{r}"].font = F(size=10, color="1F5FAD", underline="single")
ws.conditional_formatting.add(f"K{FIRST}:K{LAST}", DataBarRule(start_type="num", start_value=0, end_type="num", end_value=40, color="22C3D6"))
for txt, bg, fg in [("Retenir", "E6F4EA", "1E7D32"), ("À vérifier", "FFF4E0", "B26A00"), ("À écarter", "FDE8E8", "C62828")]:
    ws.conditional_formatting.add(f"L{FIRST}:L{LAST}", FormulaRule(formula=[f'L{FIRST}="{txt}"'], fill=PatternFill("solid", fgColor=bg), font=Font(name="Arial", bold=True, color=fg)))
dv = DataValidation(type="whole", operator="between", formula1="1", formula2="4", showErrorMessage=True, errorTitle="Note invalide", error="Saisis une note entière de 1 à 4.")
ws.add_data_validation(dv); dv.add(f"H{FIRST}:J{LAST}")
dv2 = DataValidation(type="list", formula1='"Cybersécurité,Technologique,Juridique / réglementaire,Cloud,Infrastructure,Réseaux"', allow_blank=True)
ws.add_data_validation(dv2); dv2.add(f"G{FIRST}:G{LAST}")
ws.auto_filter.ref = f"A5:L{LAST}"; ws.freeze_panes = "A6"
ws.print_title_rows = "5:5"; ws.page_setup.orientation = "landscape"; ws.page_setup.fitToWidth = 1; ws.page_setup.fitToHeight = 0; ws.sheet_properties.pageSetUpPr.fitToPage = True
g = wb.create_sheet("Grille de notation"); g.sheet_view.showGridLines = False
g.column_dimensions["A"].width = 26; g.column_dimensions["B"].width = 90
g["A1"] = "Grille de notation des sources"; g["A1"].font = F(bold=True, size=14, color=NAVY)
lines = [("Pertinence (poids en H5)", "4 : traite directement l'IA en entreprise et ses enjeux de sécurité · 3 : lien fort · 2 : lien partiel · 1 : hors sujet"),
 ("Date / actualité (poids en I5)", "4 : moins de 12 mois et date exacte connue · 3 : 1 à 2 ans · 2 : plus de 2 ans mais toujours une référence · 1 : non datée ou dépassée"),
 ("Fiabilité de l'auteur (poids en J5)", "4 : organisme officiel (ANSSI, CERT-FR, CNIL, Commission européenne) · 3 : média spécialisé ou organisation reconnue · 2 : blog d'expert identifié · 1 : auteur anonyme"),
 ("Score total", "Somme des notes × poids. Maximum = 4 × (H5 + I5 + J5), soit 40 avec les poids 3, 4, 3."),
 ("Recommandation", f"Retenir : au moins 75 % du maximum (30/40) · À vérifier : plus de {SEUIL}/40 · À écarter : {SEUIL}/40 ou moins. Seuls les articles à plus de {SEUIL}/40 sont publiés."),
 ("À remplir", "Colonnes B à G et notes H à J. Ne touche pas aux colonnes K et L (formules)."),
 ("Mise à jour", f"Fichier régénéré automatiquement à partir des notes du portfolio (content.json), le {datetime.date.today().strftime('%d/%m/%Y')}.")]
for i, (a, b) in enumerate(lines):
    r = 3 + i; g[f"A{r}"] = a; g[f"B{r}"] = b; g[f"A{r}"].font = F(bold=True, size=10, color=NAVY); g[f"B{r}"].font = F(size=10)
    g[f"B{r}"].alignment = Alignment(wrap_text=True, vertical="top"); g[f"A{r}"].alignment = Alignment(vertical="top", wrap_text=True); g.row_dimensions[r].height = 32
wb.save("docs/veille-sources.xlsx"); print(f"docs/veille-sources.xlsx : {len(arts)} articles")
