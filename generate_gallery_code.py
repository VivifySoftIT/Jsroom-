import os

assets_dir = r"c:\Users\hp\Jsroom-\src\Assets"
files = [f for f in os.listdir(assets_dir) if os.path.isfile(os.path.join(assets_dir, f))]

# Filter for images and videos
valid_extensions = ('.jpg', '.png', '.MOV', '.svg')
files = [f for f in files if f.endswith(valid_extensions)]

# Generate imports
imports = []
array_items = []

for i, f in enumerate(files):
    var_name = f"asset_{i}"
    imports.append(f"import {var_name} from '../Assets/{f}';")
    
    category = "rooms"
    if "MOV" in f:
        category = "tour"
    
    array_items.append(f"""  {{
    id: {i+1},
    url: {var_name},
    category: '{category}',
    title: '{f}',
    description: 'JS ROOMS Visual Display',
    featured: {"true" if i < 10 else "false"},
    type: '{"video" if "MOV" in f else "image"}'
  }},""")

with open(r"c:\Users\hp\Jsroom-\gallery_code.txt", "w") as out:
    out.write("\n".join(imports))
    out.write("\n\nconst galleryImages = [\n")
    out.write("\n".join(array_items))
    out.write("\n];\n")
