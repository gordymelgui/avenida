import re

filepath = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\outfit.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the mobile @media query block to use a stacked layout with horizontal scroll
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
      display: flex; 
      flex-direction: column;
    }
    
    /* Center character goes to the top */
    .center { 
      order: -1; 
      padding: 15px 10px; 
      border-bottom: 3px solid var(--border); 
    }
    
    .panel { 
      border: none; 
      border-bottom: 3px solid var(--border); 
      padding: 15px 5px; 
    }
    .panel.right { 
      border-bottom: none; 
      padding: 15px; 
    }
    
    /* Horizontal scroll for items grid */
    .items-grid { 
      display: flex; 
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: auto; 
      gap: 12px; 
      padding-bottom: 15px;
      -webkit-overflow-scrolling: touch;
    }
    
    .item-card { 
      min-width: 90px;
      flex-shrink: 0;
      padding: 8px 4px;
    }
    .item-emoji { height: 50px !important; }
    .item-label { font-size: 0.55rem; }
    
    .char-card {
      padding: 15px 10px 10px;
      margin: 0 auto;
      width: 100%;
    }
  }
  '''
content = re.sub(old_media_query_regex, new_media_query, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Outfit mobile layout updated to horizontal carousel!")
