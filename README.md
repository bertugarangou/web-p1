# web-p1
Projectes Web Pràctica 1

## NOTES

 - S'ignora la carpeta ***node_modules*** i ***dist*** tal com demana el profe. Es pot canviar al [.gitignore](https://github.com/bertugarangou/web-p1/blob/3f0a004110780ba055cb4889d1004bb01631fd79/.gitignore) si fa falta.
 - afegir el seguent text si no canvia res a scripts de package.json per automatitzar el compile amb `npm run build`
 ```
   "scripts": {
    "clean": "Rmdir dist /s/q",
    "links": "npx check-html-links dist",
    "compilar": "html-minifier --input-dir src --output-dir dist --file-ext html --collapse-whitespace --remove-comments ",
    "copy": " xcopy /i/s/r/h/y .\\src\\media\\ .\\dist\\media",
    "build": "npm run clean && npm run compilar && npm run copy && npm run links"
  },
 ```
