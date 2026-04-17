param(
  [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Continue"

$projectPath = (Resolve-Path $ProjectRoot).Path
$publicRoot  = Join-Path $projectPath "public"
$assetRoot   = Join-Path $publicRoot "assets\external"
$fontsCss    = Join-Path $publicRoot "fonts-local.css"

function Read-AllText {
  param([string]$Path)
  [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}

function Write-AllText {
  param([string]$Path, [string]$Content)
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Get-RelativePathForFile {
  param([string]$FromFile, [string]$ToFile)
  $fromDir = Split-Path $FromFile -Parent
  $fromUri = New-Object System.Uri(($fromDir.TrimEnd('\') + '\'))
  $toUri = New-Object System.Uri($ToFile)
  ($fromUri.MakeRelativeUri($toUri).ToString() -replace '/', '/')
}

$files = Get-ChildItem -Path $projectPath -Recurse -File | Where-Object {
  $_.Extension.ToLower() -in @(".html",".css",".js",".jsx",".ts",".tsx") -and
  $_.FullName -notmatch '\\node_modules\\' -and
  $_.FullName -notmatch '\\\.next\\' -and
  $_.FullName -notmatch '\\dist\\' -and
  $_.FullName -notmatch '\\build\\' -and
  $_.FullName -notmatch '\\backup-localize-'
}

$vendorMap = @{}
$vendorMap["https://unpkg.com/grapesjs"] = Join-Path $assetRoot "vendor\grapesjs.js"
$vendorMap["https://unpkg.com/grapesjs/dist/css/grapes.min.css"] = Join-Path $assetRoot "vendor\grapes.min.css"
$vendorMap["https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"] = Join-Path $assetRoot "vendor\swiper-bundle.min.css"
$vendorMap["https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"] = Join-Path $assetRoot "vendor\swiper-bundle.min.js"

foreach ($file in $files) {
  $content = Read-AllText $file.FullName
  $original = $content

  if (Test-Path $fontsCss) {
    $content = [regex]::Replace(
      $content,
      'https?:\/\/fonts\.googleapis\.com\/[^\s"''\)<>]+',
      '/fonts-local.css'
    )
  }

  foreach ($url in $vendorMap.Keys) {
    $dest = $vendorMap[$url]
    if (Test-Path $dest) {
      $rel = Get-RelativePathForFile -FromFile $file.FullName -ToFile $dest
      $content = $content.Replace($url, $rel)
    }
  }

  $content = [regex]::Replace(
    $content,
    'https?:\/\/fonts\.gstatic\.com\/[^\s"''\)<>]+',
    '/fonts-local.css'
  )

  if ($content -ne $original) {
    Write-AllText -Path $file.FullName -Content $content
    Write-Host "Ripulito: $($file.FullName)"
  }
}

Write-Host ""
Write-Host "=== AUDIT FINALE URL ESTERNI ==="

$remaining = @()

foreach ($file in $files) {
  $content = Read-AllText $file.FullName
  $matches = [regex]::Matches($content, 'https?:\/\/[^\s"''\)<>]+') | ForEach-Object { $_.Value } | Sort-Object -Unique

  foreach ($m in $matches) {
    $remaining += [PSCustomObject]@{
      File = $file.FullName
      Url  = $m
    }
  }
}

if ($remaining.Count -eq 0) {
  Write-Host "NESSUN URL ESTERNO RIMASTO"
} else {
  $remaining | Sort-Object File, Url | Format-Table -AutoSize
}

Write-Host ""
Write-Host "Controlla ora /main e /edit."