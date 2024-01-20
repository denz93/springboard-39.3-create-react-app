import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import {Hono} from 'hono';
import http from 'node:http';
import  {Server as IOServer} from 'socket.io';
import { serve } from '@hono/node-server'
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

let indexHTML = '';
let indexScript = '';
let indexCSS = '';
const appDir = path.resolve('.')
const app = createDevApp()
const server = serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  
  console.log(`Dev server start listening on http://localhost:${info.port}`)

})
const ioServer = new IOServer(server)

build()

process.on('SIGINT', () => {
  server.close()
  ioServer.close()
  process.exit(0)
})

fs.watch(appDir, {recursive: true}, async (eventType, fileName) => {
  if (fileName.startsWith('dist') || fileName.startsWith('my-dev-tools')) return;
  console.clear()
  console.log(`Code changed detected: ${fileName}`)
  try {
    await build()
    ioServer.emit('code-changed')
    console.log('Build code success')
  } catch (err) {
    console.error('Build code failed')
    console.log(err)
    ioServer.emit("build-failed", {
      message: err.message,
      stack: err.stack
    })
  }
})


async function build() {
  const result = await esbuild.build({
    write: false,
    entryPoints: ['index.js'],
    loader: {'.js': 'jsx'},
    bundle: true,
    minify: false,
    jsx: 'automatic',
    outdir: 'dist',
    plugins: []
  })
  
  indexHTML = fs.readFileSync(path.resolve(appDir, 'index.html'), 'utf-8')
  indexHTML = indexHTML.replace('<!--inject-->', `<script type="module" src="inject.js"></script>`);
  if (result.warnings.length > 0) {
    console.log(result.warnings.map(w => w.detail).join(', '))
  }
  if (result.errors.length > 0) {
    console.log(result.errors.map(e => e.detail).join(', '))
    return;
  }
  result.outputFiles.forEach(async (file) => {
    console.log(`Build success: ${file.path}`)
    if (file.path.endsWith('index.js'))
      indexScript = file.text;
    if (file.path.endsWith('index.css')) {
      const result = await postcss([autoprefixer, tailwindcss]).process(file.text, {from: undefined})
      indexCSS =  result.css
    }
  })
}

function createDevApp() {
  const app = new Hono();
  
  app.get('/', (c) => {
    return c.html(indexHTML, 200, { 'Content-Type': 'text/html' })
  })
  app.get('/index.js', (c) => {
    return c.text(indexScript, 200, { 'Content-Type': 'text/javascript' })
  })
  app.get('/index.css', (c) => {
    return c.text(indexCSS, 200, { 'Content-Type': 'text/css' })
  })
  app.get('/inject.js', (c) => {
    return c.text(fs.readFileSync(path.resolve(appDir, 'my-dev-tools', 'inject.js'), 'utf-8'), 200, { 'Content-Type': 'text/javascript' })
  })


  
  return app
}