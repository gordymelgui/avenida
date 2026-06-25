import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Define the regex for the block we just inserted at the bottom of the file
newsletter_block_regex = r'(    <!-- Newsletter / Sorteos Section -->\n    <section class=\"py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100\">.*?</section>)\n'

match = re.search(newsletter_block_regex, content, flags=re.DOTALL)
if match:
    newsletter_html = match.group(1)
    
    # 2. Remove it from its current position
    content = content.replace(newsletter_html + '\n', '')
    
    # 3. Add it immediately before the exact footer tag
    content = content.replace('<footer class="bg-[#111111] text-white pt-16 pb-8">', newsletter_html + '\n\n    <footer class="bg-[#111111] text-white pt-16 pb-8">')
    
    # 4. Remove the old "Newsletter" 4th column from the original footer
    old_col_exact = r'                    <!-- Columna 4: Newsletter -->\n                    <div>\n                        <h4 class=\"text-lg font-bold mb-6\">Newsletter</h4>\n                        <p class=\"text-gray-400 mb-4\">Suscríbete para recibir ofertas exclusivas.</p>\n                        <form class=\"flex flex-col space-y-3\">\n                            <input type=\"email\" placeholder=\"Tu email\"\n                                class=\"bg-\[#2a2a2a\] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-\[#8357C5\]\">\n                            <button type=\"submit\"\n                                class=\"bg-\[#8357C5\] text-white px-6 py-3 rounded-lg font-semibold hover:bg-\[#6e48a9\] transition-colors\">\n                                Suscribirse\n                            </button>\n                        </form>\n                    </div>'
    
    # Let's just use string replace for the column to avoid regex matching errors with brackets
    old_col_string = """                    <!-- Columna 4: Newsletter -->
                    <div>
                        <h4 class="text-lg font-bold mb-6">Newsletter</h4>
                        <p class="text-gray-400 mb-4">Suscríbete para recibir ofertas exclusivas.</p>
                        <form class="flex flex-col space-y-3">
                            <input type="email" placeholder="Tu email"
                                class="bg-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8357C5]">
                            <button type="submit"
                                class="bg-[#8357C5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6e48a9] transition-colors">
                                Suscribirse
                            </button>
                        </form>
                    </div>"""
    
    content = content.replace(old_col_string, '')
    
    # 5. Fix the grid so it's 3 columns instead of 4
    content = content.replace('grid-cols-1 md:grid-cols-4 gap-8 mb-12', 'grid-cols-1 md:grid-cols-3 gap-8 mb-12')
    
    # Write it back
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Successfully moved the Newsletter section to just before the footer!")
else:
    print("Could not find the Newsletter HTML string in index.html to move it.")
