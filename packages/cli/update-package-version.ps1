Param(
  [string]$version
)

# To be executed on build server, see .vsts-ci.yml

$executingDir = Get-Location
$scriptPath = $script:MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath

# Update package.json dependencies
$packageJsonLocation = ($dir + '\package.json')

$packageJson = Get-Content $packageJsonLocation -raw | ConvertFrom-Json
$packageJson.version = "$version"
$packageJson.dependencies | Add-Member -NotePropertyName '@refract-cms/core' -NotePropertyValue "$version"
$packageJson.dependencies | Add-Member -NotePropertyName '@refract-cms/dashboard' -NotePropertyValue "$version"
$packageJson.dependencies | Add-Member -NotePropertyName '@refract-cms/server' -NotePropertyValue "$version"

$packageJson | ConvertTo-Json | set-content $packageJsonLocation