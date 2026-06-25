# -*- coding: utf-8 -*-
import os, glob

# Map of common mojibake characters to their UTF-8 equivalents
replacements = {
    'âœ…': '✅',
    'ðŸš€': '🚀',
    'ðŸ’°': '💰',
    'ðŸ“¦': '📦',
    'ðŸ”¢': '🔢',
    'ðŸ’µ': '💵',
    'ðŸ“Š': '📊',
    'âš ï¸ ': '⚠️',
    'âœ': '✅', # Partial
    'Ã‰': 'É',
    'Ã©': 'é',
    'Ã³': 'ó',
    'Ã¡': 'á',
    'Ã±': 'ñ',
    'Ã': 'í', # This can be tricky
    'Â©': '©',
    'â Œ': '❌',
    'ðŸ“ ': '📝',
    'ðŸ›’': '🛒',
    'âœ…': '✅'
}

def fix_file(filename):
    try:
        # Try reading as UTF-8 first
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        # Fallback to latin-1 if UTF-8 fails
        try:
            with open(filename, 'r', encoding='latin-1') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {filename}: {e}")
            return

    # Replace mojibake
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    
    # Also fix some specific strings
    new_content = new_content.replace('âœ…', '✅') # Double check
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed encoding and mojibake in {filename}")
    else:
        # Save as UTF-8 anyway to ensure consistency
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Standardized {filename} to UTF-8")

# Fix all HTML and JS files
for ext in ['*.html', '*.js']:
    for f in glob.glob(ext):
        fix_file(f)

print("All files processed.")
