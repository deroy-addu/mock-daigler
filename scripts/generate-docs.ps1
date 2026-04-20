$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$files = @(
  'README.md','GEMINI.md','package.json','tsconfig.json','next.config.ts','eslint.config.mjs','postcss.config.mjs',
  'app/globals.css','app/layout.tsx','app/page.tsx','app/home/page.tsx','app/dashboard/page.tsx','app/announcements/page.tsx',
  'app/assignments/page.tsx','app/assignments/[id]/page.tsx','app/assignments/[id]/submit/page.tsx','app/assignments/[id]/edit/page.tsx',
  'app/grades/page.tsx','app/exams/page.tsx','app/forums/page.tsx','app/profile/page.tsx',
  'components/Header.tsx','components/Sidebar.tsx','lib/data.ts','lib/store.ts'
)

function Escape-Markdown([string]$text) {
  if ($null -eq $text) { return '' }
  return $text.Replace('|','\\|').Replace('<','&lt;').Replace('>','&gt;')
}

function Explain-Line([string]$line) {
  $trim = $line.Trim()
  if ($trim -eq '') { return 'Separator line for readability.' }
  if ($trim -match '^//') { return 'Comment describing the next logic block.' }
  if ($trim -match '^import\s+') { return 'Imports a dependency or symbol required by this file.' }
  if ($trim -match '^export\s+interface\s+') { return 'Exports a TypeScript interface contract.' }
  if ($trim -match '^interface\s+') { return 'Declares a local TypeScript interface.' }
  if ($trim -match '^type\s+') { return 'Declares a TypeScript type alias.' }
  if ($trim -match '^export\s+const\s+') { return 'Exports a constant for reuse in other modules.' }
  if ($trim -match '^const\s+') { return 'Declares a constant used by this module.' }
  if ($trim -match '^export\s+default\s+function\s+') { return 'Defines and exports the main function/component.' }
  if ($trim -match '^function\s+') { return 'Defines a helper function or sub-component.' }
  if ($trim -match '^return\s*\(') { return 'Begins returning JSX markup for rendering.' }
  if ($trim -match '^return\s+') { return 'Returns a computed value from the function.' }
  if ($trim -match '^if\s*\(') { return 'Conditional guard controlling logic path.' }
  if ($trim -match 'useState\(') { return 'Uses React state hook for local state.' }
  if ($trim -match 'useEffect\(') { return 'Uses React effect hook for side effects.' }
  if ($trim -match 'useMemo\(') { return 'Uses React memoization for derived values.' }
  if ($trim -match 'className=') { return 'Applies Tailwind utility classes for styling.' }
  if ($trim -match 'href=') { return 'Defines navigation target for a link.' }
  if ($trim -match 'onClick=') { return 'Attaches click event handler.' }
  if ($trim -match 'onChange=') { return 'Attaches value-change event handler.' }
  if ($trim -match 'localStorage') { return 'Reads/writes persisted browser data.' }
  if ($trim -match 'JSON\.parse') { return 'Deserializes JSON text into objects.' }
  if ($trim -match 'JSON\.stringify') { return 'Serializes objects into JSON text.' }
  if ($trim -match '^@import') { return 'Imports a stylesheet package (Tailwind).' }
  if ($trim -match '^:root') { return 'Defines global CSS variables.' }
  if ($trim -match '^@theme') { return 'Declares Tailwind v4 theme variables.' }
  if ($trim -match '^\}$') { return 'Closes the current object or function scope.' }
  return 'Implements part of this module behavior or structure.'
}

$folderDescriptions = @(
  '- .: Project root with framework configs and root documentation files.',
  '- app: Next.js App Router routes, root layout, and global styles.',
  '- app/announcements: Campus announcements route.',
  '- app/assignments: Assignment listing and nested detail/edit/submit routes.',
  '- app/assignments/[id]: Dynamic assignment detail route.',
  '- app/assignments/[id]/edit: Edit existing assignment submission route.',
  '- app/assignments/[id]/submit: Create assignment submission route.',
  '- app/dashboard: Main dashboard route with widgets and activity feed.',
  '- app/exams: Upcoming exams schedule route.',
  '- app/forums: Discussion forums route.',
  '- app/grades: Recent grades route.',
  '- app/home: Site home route.',
  '- app/profile: User profile route.',
  '- components: Shared UI components.',
  '- lib: Shared type definitions and state management logic.',
  '- public: Static assets served directly by Next.js.'
)

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('# mock-daigler Documentation Model')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## Purpose')
[void]$sb.AppendLine('This document provides detailed documentation for each folder, each component/function/interface, and each line of code in maintained source/config files.')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## Folder Explanations')
$folderDescriptions | ForEach-Object { [void]$sb.AppendLine($_) }
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## Notes on Classes')
[void]$sb.AppendLine('- This project does not use class-based React components or custom classes in source code.')
[void]$sb.AppendLine('- Behavior is implemented using function components, hooks, interfaces, and type aliases.')
[void]$sb.AppendLine('')

foreach ($rel in $files) {
  if (-not (Test-Path -LiteralPath $rel)) { continue }

  $content = Get-Content -LiteralPath $rel
  $count = $content.Count

  $purpose = switch -Wildcard ($rel) {
    'app/layout.tsx' { 'Defines the global shell for all pages: html/body, fonts, sidebar, and header.' }
    'app/page.tsx' { 'Redirects root route to the dashboard route.' }
    'app/globals.css' { 'Defines global CSS variables and Tailwind setup.' }
    'components/Header.tsx' { 'Header UI with notifications and profile navigation.' }
    'components/Sidebar.tsx' { 'Sidebar navigation with active state and collapsible section.' }
    'lib/data.ts' { 'Type definitions and seed data for assignments and activities.' }
    'lib/store.ts' { 'Client-side state hook with localStorage persistence.' }
    'app/dashboard/page.tsx' { 'Dashboard screen with course cards, announcements, activities, and deadlines.' }
    'app/assignments/page.tsx' { 'Assignments table with search/filter/sort and route actions.' }
    'app/assignments/[id]/page.tsx' { 'Assignment detail page with inline submit/edit panels.' }
    'app/assignments/[id]/submit/page.tsx' { 'Submission form route for uploading assignment work.' }
    'app/assignments/[id]/edit/page.tsx' { 'Edit/remove route for previously submitted work.' }
    'app/announcements/page.tsx' { 'Announcement listing route.' }
    'app/grades/page.tsx' { 'Recent grades cards route.' }
    'app/exams/page.tsx' { 'Upcoming exams schedule route.' }
    'app/forums/page.tsx' { 'Discussion forums overview route.' }
    'app/profile/page.tsx' { 'Profile and account overview route.' }
    'app/home/page.tsx' { 'Home landing card and welcome text route.' }
    'README.md' { 'Starter Next.js readme instructions.' }
    'GEMINI.md' { 'Custom project summary and coding conventions.' }
    'package.json' { 'NPM scripts and dependencies.' }
    'tsconfig.json' { 'TypeScript compiler options and include/exclude patterns.' }
    'next.config.ts' { 'Next.js config object.' }
    'eslint.config.mjs' { 'ESLint flat config with Next presets.' }
    'postcss.config.mjs' { 'PostCSS plugins for Tailwind processing.' }
    default { 'Project file with implementation details.' }
  }

  [void]$sb.AppendLine("## File: $rel")
  [void]$sb.AppendLine('')
  [void]$sb.AppendLine("- Purpose: $purpose")
  [void]$sb.AppendLine("- Total lines: $count")

  $symbols = New-Object System.Collections.Generic.List[string]
  foreach ($ln in $content) {
    $t = $ln.Trim()
    if ($t -match '^export\s+default\s+function\s+([A-Za-z0-9_]+)') { $symbols.Add("Default function: $($matches[1])") }
    elseif ($t -match '^function\s+([A-Za-z0-9_]+)\s*\(') { $symbols.Add("Function: $($matches[1])") }
    elseif ($t -match '^const\s+([A-Za-z0-9_]+)\s*=\s*\(') { $symbols.Add("Const function/component: $($matches[1])") }
    elseif ($t -match '^export\s+interface\s+([A-Za-z0-9_]+)') { $symbols.Add("Interface: $($matches[1])") }
    elseif ($t -match '^type\s+([A-Za-z0-9_]+)\s*=') { $symbols.Add("Type alias: $($matches[1])") }
  }

  $uniqueSymbols = $symbols | Select-Object -Unique
  if ($uniqueSymbols.Count -gt 0) {
    [void]$sb.AppendLine('- Key symbols:')
    foreach ($s in $uniqueSymbols) { [void]$sb.AppendLine("  - $s") }
  }

  [void]$sb.AppendLine('')
  [void]$sb.AppendLine('### Line-by-line breakdown')
  [void]$sb.AppendLine('| Line | Code | Explanation |')
  [void]$sb.AppendLine('| --- | --- | --- |')

  for ($i = 0; $i -lt $content.Count; $i++) {
    $code = Escape-Markdown $content[$i]
    $exp = Escape-Markdown (Explain-Line $content[$i])
    [void]$sb.AppendLine("| $($i + 1) | $code | $exp |")
  }

  [void]$sb.AppendLine('')
}

$outputPath = Join-Path $root 'PROJECT_DOCUMENTATION_MODEL.md'
[System.IO.File]::WriteAllText($outputPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Output "Generated: $outputPath"