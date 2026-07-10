import re
import os

filepath = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\outfit.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace fonts
content = content.replace(
    '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">',
    '''<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;900&family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
@font-face {
    font-family: 'Rip Regular';
    src: url('./rip-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
</style>'''
)

# Update CSS variables and global styles
css_vars = '''  :root {
    --purple: #8357C5;
    --purple-light: #9d7bd8;
    --purple-dark: #6e48a9;
    --cream: #F5F0E8;
    --dark: #1a1a1a;
    --border: #1a1a1a;
    --brutal-shadow: 6px 6px 0px var(--dark);
    --brutal-shadow-hover: 3px 3px 0px var(--dark);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--purple-light);
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: center center;
    color: var(--dark);
    font-family: 'Space Grotesk', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    cursor: url('AP/cursor_mano_AP_32.png'), auto;
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
'''
content = re.sub(r':root\s*\{.*?\}.*?body\s*\{.*?\}', css_vars, content, flags=re.DOTALL)

# Update header
header_css = '''  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 36px;
    border-bottom: 4px solid var(--dark);
    background: var(--purple);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 0 var(--dark);
  }
  .logo-text {
    font-family: 'Rip Regular', sans-serif;
    font-size: 3rem;
    color: #fff;
    text-shadow: 3px 3px 0 var(--dark);
    letter-spacing: 2px;
  }
  .logo-sub {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--dark);
    text-transform: uppercase;
    font-weight: 900;
    margin-top: -8px;
    background: #fff;
    padding: 2px 6px;
    border: 2px solid var(--dark);
    border-radius: 4px;
    display: inline-block;
  }
  .header-tag {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.6rem;
    color: #fff;
    text-transform: uppercase;
    background: var(--dark);
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 4px 4px 0 rgba(255,255,255,0.3);
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }'''
content = re.sub(r'/\* HEADER \*/.*?/\* MAIN GRID \*/', '/* HEADER */\n' + header_css + '\n\n  /* MAIN GRID */', content, flags=re.DOTALL)

# Update side panels
panel_css = '''  /* SIDE PANELS */
  .panel {
    background: var(--cream);
    border-right: 4px solid var(--border);
    padding: 20px 14px;
    overflow-y: auto;
  }
  .panel.right { border-right: none; border-left: 4px solid var(--border); }
  .panel-title {
    font-family: 'Rip Regular', sans-serif;
    font-size: 1.5rem;
    color: var(--dark);
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 4px solid var(--border);
  }'''
content = re.sub(r'/\* SIDE PANELS \*/.*?/\* ITEM CARDS \*/', panel_css + '\n\n  /* ITEM CARDS */', content, flags=re.DOTALL)

# Update item cards
cards_css = '''  /* ITEM CARDS */
  .items-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .item-card {
    background: #fff;
    border: 3px solid var(--border);
    border-radius: 8px;
    padding: 12px 6px 8px;
    cursor: pointer;
    text-align: center;
    transition: all 0.1s ease;
    position: relative;
    user-select: none;
    box-shadow: var(--brutal-shadow);
  }
  .item-card:hover {
    background: var(--purple-light);
    transform: translate(2px, 2px);
    box-shadow: var(--brutal-shadow-hover);
  }
  .item-card.active {
    background: var(--purple);
    color: #fff;
    transform: translate(4px, 4px);
    box-shadow: 2px 2px 0px var(--dark);
  }
  .item-card.active::after {
    content: '★';
    position: absolute;
    top: -10px; right: -10px;
    font-size: 1.2rem;
    color: #ffd700;
    text-shadow: 2px 2px 0 var(--dark);
    animation: float 2s infinite;
  }
  .item-emoji {
    font-size: 2.4rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }
  .item-card:hover .item-emoji { transform: scale(1.15) rotate(-10deg); }
  .item-card.active .item-emoji { transform: scale(1.1); }
  .item-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--dark);
    font-weight: 800;
    display: block;
    line-height: 1.3;
  }
  .item-card.active .item-label { color: #fff; }'''
content = re.sub(r'/\* ITEM CARDS \*/.*?/\* CENTER \*/', cards_css + '\n\n  /* CENTER */', content, flags=re.DOTALL)

# Update char card and canvas
char_css = '''  /* CHARACTER CANVAS */
  .char-card {
    background: #fff;
    border: 4px solid var(--dark);
    border-radius: 16px;
    box-shadow: 12px 12px 0px rgba(0,0,0,0.2);
    padding: 24px 20px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .char-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(131,87,197,0.05) 10px,
      rgba(131,87,197,0.05) 20px
    );
    pointer-events: none;
  }
  .char-badge {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.5rem;
    color: var(--purple);
    margin-top: 15px;
    padding: 4px 8px;
    border: 2px solid var(--purple);
    border-radius: 4px;
    background: rgba(131,87,197,0.1);
  }'''
content = re.sub(r'/\* CHARACTER CANVAS \*/.*?/\* ACTION BUTTONS \*/', char_css + '\n\n  /* ACTION BUTTONS */', content, flags=re.DOTALL)

# Update action buttons and inputs
action_css = '''  /* ACTION BUTTONS */
  .action-btn {
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 3px solid var(--dark);
    background: #fff;
    color: var(--dark);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 12px;
    box-shadow: var(--brutal-shadow);
    transition: all 0.1s ease;
  }
  .action-btn:hover {
    transform: translate(2px, 2px);
    box-shadow: var(--brutal-shadow-hover);
    background: var(--cream);
  }
  .action-btn:active {
    transform: translate(6px, 6px);
    box-shadow: 0 0 0 var(--dark);
  }
  .action-btn.primary {
    background: var(--purple);
    color: #fff;
  }
  .action-btn.primary:hover {
    background: var(--purple-light);
  }
  .action-btn.danger { background: #ff4757; color: #fff; }
  .action-btn.danger:hover { background: #ff6b81; }

  /* Outfit name */
  .field-label {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800;
    font-size: 0.7rem;
    color: var(--dark);
    margin-bottom: 8px;
    display: block;
    text-transform: uppercase;
  }
  .outfit-input {
    width: 100%;
    background: #fff;
    border: 3px solid var(--dark);
    border-radius: 8px;
    padding: 10px 12px;
    color: var(--dark);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 16px;
    box-shadow: inset 3px 3px 0 rgba(0,0,0,0.05);
    outline: none;
  }
  .outfit-input:focus { 
    border-color: var(--purple); 
    box-shadow: var(--brutal-shadow);
  }

  /* Selected list */
  .selected-list { margin-top: 14px; }
  .selected-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: #fff;
    border: 2px solid var(--dark);
    border-radius: 6px;
    margin-bottom: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--dark);
    box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
  }
  .selected-item span { font-size: 1rem; }'''
content = re.sub(r'/\* ACTION BUTTONS \*/.*?/\* FOOTER \*/', action_css + '\n\n  /* FOOTER */', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Outfit HTML updated with a more animated, vibrant, brutalist game style!")
