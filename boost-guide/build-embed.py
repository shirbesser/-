import re
"""Builds boost-guide/ravpages-embed*.html from boost-guide/index.html (or --page thank-you).

Run from the repo root:  python3 boost-guide/build-embed.py
Inlines the portrait (assets/shir-embed.webp) and the headline font as data URIs
and prefixes every CSS class with `bg-` so RavPages' own styles cannot collide.
"""
import base64, os, sys
# --remote: reference the font files and portrait by public GitHub URL instead of inlining them
REMOTE='--remote' in sys.argv
PAGE=sys.argv[sys.argv.index('--page')+1] if '--page' in sys.argv else 'index'
RAW='https://raw.githubusercontent.com/shirbesser/-/claude/bold-maxwell-onmbyp/boost-guide/'
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'')
def data_uri(path,mime):
    if REMOTE: return RAW+path
    return 'data:'+mime+';base64,'+base64.b64encode(open(R+path,'rb').read()).decode()
s=open(R+PAGE+'.html',encoding='utf-8').read()
head=s[s.index('<head>')+6:s.index('</head>')]
body=s[s.index('<body>')+6:s.index('</body>')]
style=head[head.index('<style>')+7:head.index('</style>')]
fontlink=re.search(r'<link href="https://fonts.googleapis.com[^>]*>',head).group(0)
names=set()
for m in re.finditer(r'class="([^"]+)"',body): names.update(m.group(1).split())
names.update(['in','open','show'])
for n in sorted(names,key=len,reverse=True):
    style=re.sub(r'\.'+re.escape(n)+r'(?![\w-])','.bg-'+n,style)
rep=[('html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}',''),
 ('body{\n  margin:0;','#bg-page{\n  margin:0;'),
 ('*{box-sizing:border-box}','#bg-page,#bg-page *{box-sizing:border-box}'),
 ('img,svg{max-width:100%;display:block}','#bg-page img,#bg-page svg{max-width:100%;display:block;border:0}'),
 ('h1,h2,h3,h4{margin:0;text-wrap:balance;color:inherit}','#bg-page h1,#bg-page h2,#bg-page h3,#bg-page h4{margin:0;padding:0;text-wrap:balance;color:var(--ink);text-align:right}'),
 ('p{margin:0}','#bg-page p{margin:0;padding:0;color:inherit;font-size:inherit;line-height:inherit;text-align:inherit}'),
 ('a{color:inherit}','#bg-page a{color:inherit;text-decoration:none}'),
 ('button{font:inherit;color:inherit}','#bg-page button{font:inherit;color:inherit}\n#bg-page ul,#bg-page ol{margin:0;padding:0}'),
 (':focus-visible{','#bg-page :focus-visible{'),
 ('::selection{','#bg-page ::selection{'),
 ('[dir="rtl"] .bg-about__care','#bg-page .bg-about__care')]
for a,b in rep:
    style=style.replace(a,b)
body=re.sub(r'class="([^"]+)"',lambda m:'class="'+' '.join('bg-'+c for c in m.group(1).split())+'"',body)
for a,b in [('querySelectorAll(".reveal")','querySelectorAll(".bg-reveal")'),('querySelectorAll(".faq__q")','querySelectorAll(".bg-faq__q")'),
 ('closest(".faq__item")','closest(".bg-faq__item")'),('querySelector(".hero")','querySelector(".bg-hero")'),
 ('classList.add("in")','classList.add("bg-in")'),('classList.toggle("open")','classList.toggle("bg-open")'),('classList.toggle("show", show)','classList.toggle("bg-show", show)')]:
    body=body.replace(a,b)
body=body.replace('<!-- PLACEHOLDER: swap assets/shir.png for the final portrait -->','<!-- Shir portrait (inlined) -->')
body=body.replace('src="assets/shir.png"','src="'+data_uri('assets/shir-embed.webp','image/webp')+'"')
body=re.sub(r'<!-- =+\n     PLACEHOLDERS.*?=+ -->\n','',body,flags=re.S)
assert 'assets/shir.png' not in body
# --- harden against host CSS (RavPages applies its own fonts/colors/vars, sometimes with !important) ---
# 1) namespace custom properties (only var() references and declarations, never BEM "--modifier" class names)
style=style.replace('var(--','var(--bgp-')
style=re.sub(r'(?<=[{;\s])--(?=[a-z][\w-]*\s*:)','--bgp-',style)
body=body.replace('var(--','var(--bgp-')
body=re.sub(r'(?<=[";])--rot:','--bgp-rot:',body)
style=style.replace(':root{','#bg-page{')
# 2) prefix every selector with #bg-page so all rules outrank host element selectors
def prefix_rules(css):
    out=[];i=0;n=len(css)
    while i<n:
        j=css.find('{',i)
        if j<0: out.append(css[i:]);break
        sel=css[i:j]
        # find matching close brace
        depth=1;k=j+1
        while k<n and depth:
            if css[k]=='{':depth+=1
            elif css[k]=='}':depth-=1
            k+=1
        inner=css[j+1:k-1]
        s=sel.strip()
        if s.startswith('@media'):
            out.append(sel+'{'+prefix_rules(inner)+'}')
        elif s.startswith('@'):
            out.append(sel+'{'+inner+'}')
        else:
            lead=sel[:len(sel)-len(sel.lstrip())]
            parts=[]
            for x in s.split(','):
                x=x.strip()
                parts.append(x if x.startswith('#bg-page') else '#bg-page '+x)
            out.append(lead+','.join(parts)+'{'+inner+'}')
        i=k
    return ''.join(out)
style=re.sub(r'/\*.*?\*/','',style,flags=re.S)
style=prefix_rules(style)
style=style.replace('#bg-page #bg-page','#bg-page')
# 3) force font families and stop host element rules from recoloring inherited text
style=style.replace('font-family:var(--bgp-font-display)','font-family:var(--bgp-font-display)!important')
style=style.replace('font-family:var(--bgp-font-body);','font-family:var(--bgp-font-body)!important;')
style=('#bg-page,#bg-page *:not(svg):not(path):not(use){font-family:var(--bgp-font-body)!important}\n'
       '#bg-page div,#bg-page span,#bg-page li,#bg-page ul,#bg-page ol,#bg-page a,#bg-page b,#bg-page strong,#bg-page small,#bg-page i,#bg-page em{color:inherit}\n')+style
style=style.replace('url("assets/FbJambo-Regular.otf")','url("'+data_uri('assets/FbJambo-Regular.otf','font/otf')+'")')
style=style.replace('url("assets/FbSpoiler-Regular.otf")','url("'+data_uri('assets/FbSpoiler-Regular.otf','font/otf')+'")')
style=style.replace('url("assets/FbSpoiler-Bold.otf")','url("'+data_uri('assets/FbSpoiler-Bold.otf','font/otf')+'")')
assert 'url("assets/' not in style


out=f'''<!-- ===== המדריך לבוסט באינסטגרם | קוד להדבקה בבלוק HTML ברב מסר ===== -->
<!-- לינק לתשלום: מופיע על כל הכפתורים וגם במשתנה PURCHASE_URL בסוף הקוד -->
{fontlink}
<style>
{style.strip()}
</style>
<div id="bg-page" dir="rtl" lang="he">
{body.strip()}
</div>
<!-- ===== סוף הקוד ===== -->
'''
open(R+('ravpages-embed' if PAGE=='index' else 'ravpages-'+PAGE)+('-lite' if REMOTE else '')+'.html','w',encoding='utf-8').write(out)
print('embed',len(out),'chars')
