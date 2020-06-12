from os import walk

def build(name, version, repo, license, dir):
  header = f'''// {name} v{version}
// Github {repo}
// {license} License
'''
  source = ''
  for path, dirs, files in walk(dir):
    for file in files:
      source += open(f'{dir}/{file}', 'r', encoding='utf-8').read()

  source = source.replace('\n\n', '\n')
  clean = ''
  for line in source.split('\n'):
    if 'class ' in line and clean[-1] != '\n': clean += '\n'
    if '//' in line: line = line.split('//')[0]
    clean += line
  source = header + clean + '\n'

  while '  ' in source: source = source.replace('  ', ' ')
  return source

if __name__ == '__main__':
  name = 'Sockent.js'
  version = '0.1.0'
  repo = 'https://github.com/Jakub21/Sockent.js'
  license = 'MIT'
  dir = './source'
  source = build(name, version, repo, license, dir)
  open(name, 'w', newline='\n').write(source)
