import re

filepath = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\outfit.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Make char-wrapper responsive (remove fixed px, use aspect-ratio)
char_wrapper_regex = r"\.char-wrapper\s*\{\s*position:\s*relative;\s*width:\s*280px;\s*height:\s*420px;\s*z-index:\s*2;\s*\}"
responsive_char_wrapper = '''  .char-wrapper {
    position: relative;
    width: 100%;
    max-width: 280px;
    aspect-ratio: 280 / 420;
    z-index: 2;
  }'''
content = re.sub(char_wrapper_regex, responsive_char_wrapper, content)

# 2. Fix the mobile @media query block entirely
old_media_query_regex = r"@media\s*\(max-width:\s*860px\)\s*\{.*?(?=#dev-helper\s*button\s*\{)"
new_media_query = '''@media (max-width: 860px) {
    body { padding: 0; margin: 0; }
    
    header { 
      flex-direction: column; 
      align-items: flex-start; 
      gap: 10px; 
      padding: 10px 15px; 
    }
    .logo-text { font-size: 2rem; }
    .header-tag { align-self: flex-start; font-size: 0.55rem; padding: 6px 10px; }
    
    .stage { 
      display: grid; 
      grid-template-columns: 100px 1fr;
      grid-template-rows: auto auto;
      grid-template-areas: 
        "items character"
        "tools tools";
      align-items: start; /* PREVENTS VERTICAL STRETCHING OF PANELS */
    }
    
    .panel { 
      grid-area: items; 
      border: none; 
      border-right: 3px solid var(--border); 
      padding: 10px 5px; 
      height: 100%; /* Fill the column height */
    }
    .center { 
      grid-area: character; 
      padding: 15px 5px; 
      align-items: flex-start; /* keep character card at top */
    }
    .panel.right { 
      grid-area: tools; 
      border: none; 
      border-top: 3px solid var(--border); 
      padding: 15px; 
    }
    
    .items-grid { 
      display: flex; 
      flex-direction: column;
      gap: 8px; 
    }
    
    .item-card { 
      min-width: 0;
      padding: 8px 4px;
    }
    .item-emoji { height: 45px !important; }
    .item-label { font-size: 0.55rem; }
    
    .char-card {
      padding: 15px 10px 10px;
      margin: 0 auto;
      width: 100%;
    }
    .char-wrapper {
      /* No scaling hacks needed now thanks to aspect-ratio */
    }
  }
  '''
content = re.sub(old_media_query_regex, new_media_query, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Mobile layout fully fixed with aspect-ratio and grid alignment!")
