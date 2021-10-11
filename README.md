# web-p1
Projectes Web Pràctica 1

## NOTES

 - S'ignora la carpeta ***node_modules*** i ***dist*** tal com demana el profe. Es pot canviar al [.gitignore](https://github.com/bertugarangou/web-p1/blob/3f0a004110780ba055cb4889d1004bb01631fd79/.gitignore) si fa falta.
 - afegir el seguent text si no canvia res a scripts de package.json per automatitzar el compile amb `npm run build`
 ```
 "scripts": {
    "clean-dir": "Rmdir dist /s/q",
    "check-links": "npx check-html-links dist",
    "compile": "html-minifier --input-dir src --output-dir dist --file-ext html --remove-comments --collapse-whitespace",
    "new-folder": "md dist\\media",
    "copy-media": "copy .\\src\\media\\* .\\dist\\media\\",
    "build": "npm run clean-dir && npm run compile && npm run new-folder && npm run copy-media && npm run check-links"
  },
 ```
