import re

filepath = r"c:\Users\jordy\Desktop\avda 2026 - copia para pruebas\outfit.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update ITEMS array with images
items_regex = r"const ITEMS = \[\n(.*?)\n\];"
def modify_items(match):
    items_str = match.group(1)
    
    # Map of ID to Image
    image_map = {
        'camisaavdasprite': "'catalogo/camisas/cami A portada principal.png'",
        'jortsiprite': "'catalogo/jorts/jort denim portada principal.png'",
        'baggysprite': "'catalogo/jeans holgados/portada baggy.png'",
        'jortsvestirsprite': "'catalogo/jorts/vestir portada principal.png'",
        'camisalogosprite': "'catalogo/camisas/cami B portada principal.png'",
        'cap': "'AP/item_cap.png'"
    }
    
    new_items_str = items_str
    for item_id, img_path in image_map.items():
        # Inject the image property after the id or label
        new_items_str = re.sub(
            rf"(id:\s*'{item_id}',\s*\n\s*label:\s*'.*?',\s*\n)",
            rf"\g<1>    image: {img_path},\n",
            new_items_str
        )
    return f"const ITEMS = [\n{new_items_str}\n];"

content = re.sub(items_regex, modify_items, content, flags=re.DOTALL)

# 2. Update rendering logic in DOMContentLoaded to add dragstart and images
render_regex = r"card\.innerHTML = `\n\s*<div class=\"item-emoji\">.*?</div>\n\s*<span class=\"item-label\">\$\{item\.label\}</span>\n\s*`;\n\s*card\.addEventListener\('click', \(\) => toggle\(item\)\);"
new_render = '''const emojiHtml = item.image ? `<img src="${item.image}" style="width: 100%; height: 100%; object-fit: contain;" alt="${item.label}">` : item.emoji;
    card.innerHTML = `
      <div class="item-emoji" style="height:64px; overflow:hidden;">${emojiHtml}</div>
      <span class="item-label">${item.label}</span>
    `;
    card.addEventListener('click', () => toggle(item));
    
    // DRAG AND DROP: dragstart
    card.draggable = true;
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
    });'''
content = re.sub(render_regex, new_render, content, flags=re.DOTALL)

# 3. Add dragover and drop events to charWrapper
wrapper_regex = r"const wrapper = document\.getElementById\('charWrapper'\);\n\s*wrapper\.addEventListener\('mousedown', \(e\) => \{"
new_wrapper = '''const wrapper = document.getElementById('charWrapper');

// DRAG AND DROP: drop target
wrapper.addEventListener('dragover', (e) => {
  e.preventDefault();
});
wrapper.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const item = ITEMS.find(i => i.id === id);
  if (item && !selected.has(item.id)) {
    toggle(item);
  }
});

wrapper.addEventListener('mousedown', (e) => {'''
content = re.sub(wrapper_regex, new_wrapper, content, flags=re.DOTALL)

# 4. Update renderList to show images instead of emojis (optional but nice)
list_regex = r"el\.innerHTML = `<div class=\"dot\"></div>\$\{item\.emoji\} \$\{item\.label\}`;(?!\n\s*const imgHtml)"
new_list = '''const imgHtml = item.image ? `<img src="${item.image}" style="width:16px;height:16px;object-fit:cover;border-radius:4px;">` : item.emoji;
    el.innerHTML = `<div class="dot"></div>${imgHtml} ${item.label}`;'''
content = re.sub(list_regex, new_list, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Drag and Drop patched successfully!")
